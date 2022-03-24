import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceUserDetailsAPI = 'user_details';
const resourceUserClothesAPI = 'users_clothes';


const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
}));

const BuyItemClothing = ({ setOpenPopup, userRole, userPoints, userDetailsId, setBuyingStatusPopup, getUserDetailsAPI, item, userClothes }) => {
    const classes = useStyles();

    const handleClick = () => {
        if (userRole === "EMPLOYEE") {
            if (userClothes.filter((cloth) => cloth.item_id === item.id).length > 0) {
                toast.info(`Posiadasz już ten przedmiot`, {
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
                let dataItems = {
                    user_details_id: userDetailsId,
                    item_id: item.id,
                    category: item.category,
                    name: item.name,
                    cost: item.cost,
                    image: item.image,
                }
                setBuyingStatusPopup(true);
                postItemsAPI(dataItems);
                setOpenPopup(false);
            }
        }
        else {
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
            } else if (userClothes.filter((cloth) => cloth.item_id === item.id).length > 0) {
                toast.info(`Posiadasz już ten przedmiot`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setOpenPopup(false);    
            }
            else {
                let pointsToUpdate = userPoints - item.cost;
                let dataUserDetails = {
                    points: pointsToUpdate * 1,
                }
                let dataItems = {
                    user_details_id: userDetailsId,
                    item_id: item.id,
                    category: item.category,
                    name: item.name,
                    cost: item.cost,
                    image: item.image,
                }
                setBuyingStatusPopup(true);
                updateUserDetailsAPI(userDetailsId, dataUserDetails, dataItems);
                setOpenPopup(false);
            }
        }
    }


    const postItemsAPI = (data) => {
        Repository.add(resourceUserClothesAPI, data).then(
            () => {
                setBuyingStatusPopup(false);
                getUserDetailsAPI();
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
                setBuyingStatusPopup(false);

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
                setBuyingStatusPopup(false);

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
                        <Button onClick={() => handleClick()} variant="contained" color="primary">Tak</Button>
                    </Grid>
                    <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                        <Button onClick={() => setOpenPopup(false)} variant="contained" color="primary">Nie</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default BuyItemClothing;