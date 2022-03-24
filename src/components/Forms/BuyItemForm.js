import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceUserDetailsAPI = 'user_details';
const resourceItemsAPI = 'users_coloring_books';


const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
}));

const BuyItemForm = ({ setOpenPopup, userPoints, userDetailsId, setBuyingStatusPopup, getUserDetailsAPI, userRole, item }) => {
    const classes = useStyles();

    const handleClick = () => {
        if (userRole === "EMPLOYEE") {
            let dataItems = {
                user_details_id: userDetailsId,
                item_id: item.id,
                category: item.category,
                item_name: item.item_name,
                source: item.source,
                cost: item.cost,
                image: item.image,
            }
            setBuyingStatusPopup(true);
            setOpenPopup(false);
            postItemsAPI(dataItems);

        } else {
            if (userPoints < item.cost) {
                toast.error(`Nie masz wystarczająco pieniędzy`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setOpenPopup(false);
            } else {
                let pointsToUpdate = userPoints - item.cost;
                let dataUserDetails = {
                    points: parseInt(pointsToUpdate),
                }
                let dataItems = {
                    user_details_id: userDetailsId,
                    item_id: item.id,
                    category: item.category,
                    item_name: item.item_name,
                    source: item.source,
                    cost: item.cost,
                    image: item.image,
                }
                setBuyingStatusPopup(true);
                setOpenPopup(false);
                updateUserDetailsAPI(userDetailsId, dataUserDetails, dataItems);
            }
        }

    }


    const postItemsAPI = (data) => {
        Repository.add(resourceItemsAPI, data).then(
            () => {
                setBuyingStatusPopup(false);
                getUserDetailsAPI();
                toast.success(`Pomyślnie kupiono przedmiot`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulPurchasedItemToast"
                });
            }
        );
    }

    const updateUserDetailsAPI = (userId, data, dataItem) => {
        Repository.update(resourceUserDetailsAPI, userId, data).then(
            () => {
                postItemsAPI(dataItem);
            },
            () => {
                toast.error(`Nie udało się kupić przedmiotu`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        );
    }

    return (
        <>
            <Grid container component="main" direction="column" xs={12} sm={true} md={true}>
                <Grid item xs={true} sm={true} md={true}>
                    <label>Czy na pewno chcesz kupić ten przedmiot?</label>
                </Grid>
                <Grid container xs={true} sm={true} md={true} className={classes.gridButton}>
                    <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                        <Button id="confirmBuyItemButton" onClick={() => handleClick()} variant="contained" color="primary">Tak</Button>
                    </Grid>
                    <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                        <Button onClick={() => setOpenPopup(false)} variant="contained" color="primary">Nie</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default BuyItemForm;