import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Repository from './../api/Repository';
import { Skeleton } from '@mui/material';
import ShopCardList from '../components/ShopPage/ShopCardList';
import Auth from '../api/Auth';
import BuyingStatusPopup from '../components/Popups/Popup';
import BuyingStatusForm from '../components/Forms/BuyingStatusForm';

const resourceShopAPI = 'shop';
const resourceUserDetailsAPI = 'user_details';

const useStyles = makeStyles(theme => ({

    pageContent: {
        margin: theme.spacing(7),
        padding: theme.spacing(3),
    },
}))

const Shop = () => {
    const classes = useStyles();
    // eslint-disable-next-line no-unused-vars
    const [openPopup, setOpenPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPointsLoading, setIsPointsLoading] = useState(true);
    const [userPoints, setUserPoints] = useState();
    const [userDetailsId, setUserDetailsId] = useState();
    const [ItemShop, setItemShop] = useState();
    const [buyingStatusPopup, setBuyingStatusPopup] = useState();

    const getShopAPI = () => {
        setIsLoading(true);
        Repository.getAll(resourceShopAPI).then(
            (data) => {
                setTimeout(() => {
                    setItemShop(data.data);
                    setIsLoading(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getUserDetails = () => {
        setIsPointsLoading(true);
        let id = parseInt(Auth.getUserId());
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                setTimeout(() => {
                    setUserPoints(data.data.data.points);
                    setUserDetailsId(data.data.data.user_id);
                    setIsPointsLoading(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getShopAPI();
        getUserDetails();
    }, []);

    return (
        <>
            <PageHeader
                title="Sklep"
                subTitle="Tutaj wykupisz nagrody za punkty"
                icon={<StoreOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>
                {!isPointsLoading ? <Typography variant="h5" component="h2">
                    Twoje punkty: {userPoints}
                </Typography> : <Typography variant="h5" component="h2">
                    Twoje punkty: Ładowanie...
                </Typography>}
                <Grid container spacing={3}>
                    {!isLoading ? <ShopCardList getUserDetailsAPI={getUserDetails} setBuyingStatusPopup={setBuyingStatusPopup} userPoints={userPoints} userDetailsId={userDetailsId} singleShopItem={ItemShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup}
                    /> :
                        (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rectangular" width={390} height={240} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rectangular" width={390} height={240} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rectangular" width={390} height={240} />
                                </Grid>
                            </Grid>
                        )}
                </Grid>
            </Container>
            <BuyingStatusPopup
                openPopup={buyingStatusPopup}
                setOpenPopup={setBuyingStatusPopup}
                title="Kupowanie..."
                isTitle={false}
            >
                <BuyingStatusForm
                    setOpenPopup={buyingStatusPopup}
                />
            </BuyingStatusPopup>
        </>
    );
};
export default Shop;