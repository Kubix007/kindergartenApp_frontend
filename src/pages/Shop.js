import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Repository from './../api/Repository';
import ShopColoringBooksCardList from '../components/ShopPage/ShopColoringBooksCardList';
import ShopClothesCardList from '../components/ShopPage/ShopClothesCardList';
import Auth from '../api/Auth';
import BuyingStatusPopup from '../components/Popups/Popup';
import BuyingStatusForm from '../components/Forms/BuyingStatusForm';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';

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
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);


    const getShopAPI = () => {
        Repository.getAll(resourceShopColoringBooksAPI).then(
            (data) => {
                setItemShop(data.data);
                setIsLoadingColoringBooks(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getUserDetails = () => {
        let id = parseInt(Auth.getUserId());
        setUserDetailsId(parseInt(Auth.getUserId()));
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                setUserPoints(data.data.data.points);
                //setUserDetailsId(data.data.data.user_id);
                setIsPointsLoading(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getShopClothesAPI = () => {
        Repository.getAll(resourceShopClothesAPI).then(
            (data) => {
                setClothesFromShop(data.data);
                setIsLoadingClothes(false);
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
        if (!isPointsLoading && !isLoadingColoringBooks && !isLoadingClothes) {
            setUpdatingStatusPopup(false);
        }
    }, [isLoadingClothes, isLoadingColoringBooks, isPointsLoading]);

    return (
        <>
            <PageHeader
                title="Sklep"
                subTitle="Tutaj wykupisz nagrody za punkty"
                icon={<StoreOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>
                {!updatingStatusPopup? <Typography variant="h5" component="h2">
                    Twoje punkty: {userPoints} pkt.
                </Typography> : null}
                <Grid container spacing={3} style={{ paddingTop: "10px" }}>
                    {!updatingStatusPopup ? <><ShopColoringBooksCardList getUserDetailsAPI={getUserDetails} setBuyingStatusPopup={setBuyingStatusPopup} userPoints={userPoints} userDetailsId={userDetailsId} singleShopItem={itemShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup}
                    /><ShopClothesCardList getUserDetailsAPI={getUserDetails} setBuyingStatusPopup={setBuyingStatusPopup} userPoints={userPoints} userDetailsId={userDetailsId} singleShopItem={clothesFromShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup} /> </> :
                        null}
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
            <UpdatingStatusPopup
                openPopup={updatingStatusPopup}
                setOpenPopup={setUpdatingStatusPopup}
                isTitle={false}
            >
                <UpdatingStatusForm
                    setOpenPopup={updatingStatusPopup}
                />
            </UpdatingStatusPopup>
        </>
    );
};
export default Shop;