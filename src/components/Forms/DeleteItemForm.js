import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceUsersColoringBooksAPI = 'users_coloring_books';

const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
}));

const deleteItemsAPI = (id) => {
    Repository.deleteRequest(resourceUsersColoringBooksAPI, id).then(
        () => {
            toast.success(`Pomyślnie usunięto przedmiot`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                toastId: "successfulDeletedItemToast"

            });
        },
        (error) => {
            console.log(error);
            console.log(error.response);
        }
    );
}
const DeleteItemForm = ({ setOpenPopup, getItemsAPI, itemId, setUpdatingStatusPopup }) => {
    const classes = useStyles();

    const handleClick = () => {
        deleteItemsAPI(itemId);
        getItemsAPI();
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
    }

    return (
        <Grid container component="main" direction="column" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <label>Czy na pewno chcesz usunąć ten przedmiot?</label>
            </Grid>
            <Grid container xs={true} sm={true} md={true} className={classes.gridButton}>
                <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                    <Button id="confirmDeleteItemButton" onClick={() => handleClick()} variant="contained" color="primary">Tak</Button>
                </Grid>
                <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                    <Button onClick={() => setOpenPopup(false)} variant="contained" color="primary">Nie</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DeleteItemForm;