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
import { toast } from 'react-toastify';

const resourceShopColoringBooksAPI = 'shop_coloring_books';
const resourceUserDetailsAPI = 'user_details';
const resourceShopClothesAPI = 'shop_clothes';
const resourceUserClothes = 'users_clothes';

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
    const [userPoints, setUserPoints] = useState();
    const [userDetailsId, setUserDetailsId] = useState();
    const [itemShop, setItemShop] = useState();
    const [clothesFromShop, setClothesFromShop] = useState();
    const [buyingStatusPopup, setBuyingStatusPopup] = useState();
    const [userClothes, setUserClothes] = useState([]);
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);


    const getShopAPI = () => {
        Repository.getAll(resourceShopColoringBooksAPI).then(
            (data) => {
                setItemShop(data.data);
                getUserDetails();
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować sklepu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);
            }
        )
    }

    const getUserDetails = () => {
        let id = parseInt(Auth.getUserId());
        setUserDetailsId(parseInt(Auth.getUserId()));
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                setUserPoints(data.data.data.points);
                getShopClothesAPI();
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować sklepu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);
            }
        )
    }

    const getShopClothesAPI = () => {
        Repository.getAll(resourceShopClothesAPI).then(
            (data) => {
                setClothesFromShop(data.data);
                getUserClothesAPI(userDetailsId);
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować sklepu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);
            }
        )
    }

    const getUserClothesAPI = (id) => {
        Repository.getById(resourceUserClothes, id).then(
            (data) => {
                setUserClothes(data.data);
                setUpdatingStatusPopup(false);
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować sklepu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);

            }
        )
    }
    ///////////////////////////////////////////////////////////////////

    const getUserDetailsRefresh = () => {
        setUpdatingStatusPopup(true);
        let id = parseInt(Auth.getUserId());
        setUserDetailsId(parseInt(Auth.getUserId()));
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                setUserPoints(data.data.data.points);
                getShopClothesAPIRefresh();
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować sklepu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);
            }
        )
    }

    const getShopClothesAPIRefresh = () => {
        Repository.getAll(resourceShopClothesAPI).then(
            (data) => {
                setClothesFromShop(data.data);
                getUserClothesAPIRefresh(userDetailsId);
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować sklepu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);
            }
        )
    }

    const getUserClothesAPIRefresh = (id) => {
        Repository.getById(resourceUserClothes, id).then(
            (data) => {
                setUserClothes(data.data);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie kupiono przedmiot`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się kupić przedmiotu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);

            }
        )
    }
    useEffect(() => {
        getShopAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageHeader
                title="Sklep"
                subTitle="Tutaj wykupisz nagrody za punkty"
                icon={<StoreOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>
                {!updatingStatusPopup ? <Typography variant="h5" component="h2">
                    Twoje punkty: {userPoints} pkt.
                </Typography> : null}
                <Grid container spacing={3} style={{ paddingTop: "10px" }}>
                    {!updatingStatusPopup ? <><ShopColoringBooksCardList getUserDetailsAPI={getUserDetails} setBuyingStatusPopup={setBuyingStatusPopup} userPoints={userPoints} userDetailsId={userDetailsId} singleShopItem={itemShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup}
                    /><ShopClothesCardList userClothes={userClothes} getUserDetailsAPI={getUserDetailsRefresh} setBuyingStatusPopup={setBuyingStatusPopup} userPoints={userPoints} userDetailsId={userDetailsId} singleShopItem={clothesFromShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup} /> </> :
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