import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Repository from './../api/Repository';
import { Skeleton } from '@mui/material';
import ShopColoringBooksCardList from '../components/ShopPage/ShopColoringBooksCardList';
import ShopClothesCardList from '../components/ShopPage/ShopClothesCardList';
import Auth from '../api/Auth';
import BuyingStatusPopup from '../components/Popups/Popup';
import BuyingStatusForm from '../components/Forms/BuyingStatusForm';

const resourceShopColoringBooksAPI = 'shop_coloring_books';
const resourceUserDetailsAPI = 'user_details';
const resourceShopClothesAPI = 'shop_clothes';

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
    const [isLoadingColoringBooks, setIsLoadingColoringBooks] = useState(true);
    const [isLoadingClothes, setIsLoadingClothes] = useState(true);
    const [isPointsLoading, setIsPointsLoading] = useState(true);
    const [userPoints, setUserPoints] = useState();
    const [userDetailsId, setUserDetailsId] = useState();
    const [itemShop, setItemShop] = useState();
    const [clothesFromShop, setClothesFromShop] = useState();
    const [buyingStatusPopup, setBuyingStatusPopup] = useState();

    const getShopAPI = () => {
        setIsLoadingColoringBooks(true);
        Repository.getAll(resourceShopColoringBooksAPI).then(
            (data) => {
                setTimeout(() => {
                    setItemShop(data.data);
                    setIsLoadingColoringBooks(false);
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

    const getShopClothesAPI = () => {
        setIsLoadingClothes(true);
        Repository.getAll(resourceShopClothesAPI).then(
            (data) => {
                setTimeout(() => {
                    setClothesFromShop(data.data);
                    setIsLoadingClothes(false);
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
        getShopClothesAPI();
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
                    Twoje punkty: {userPoints} pkt.
                </Typography> : <Typography variant="h5" component="h2">
                    Twoje punkty: Ładowanie...
                </Typography>}
                <Grid container spacing={3} style={{ paddingTop: "10px" }}>
                    {!isLoadingColoringBooks && !isLoadingClothes ? <><ShopColoringBooksCardList getUserDetailsAPI={getUserDetails} setBuyingStatusPopup={setBuyingStatusPopup} userPoints={userPoints} userDetailsId={userDetailsId} singleShopItem={itemShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup}
                    /><ShopClothesCardList getUserDetailsAPI={getUserDetails} setBuyingStatusPopup={setBuyingStatusPopup} userPoints={userPoints} userDetailsId={userDetailsId} singleShopItem={clothesFromShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup} /> </> :
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