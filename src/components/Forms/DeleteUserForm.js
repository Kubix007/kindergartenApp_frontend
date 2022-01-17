import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceAPI = 'user_details';
const resourceUserAPI = 'user';

const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
}));

const DeleteUserForm = ({ setOpenPopup, getUserDetailsAPI, editedUser, setUpdatingStatusPopup }) => {
    const classes = useStyles();

    const deleteUserDetailsAPI = (id) => {
        Repository.deleteRequest(resourceAPI, id).then(
            () => {
                deleteUserAPI(editedUser.user_id);
            },
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    const deleteUserAPI = (id) => {
        Repository.deleteRequest(resourceUserAPI, id).then(
            () => {
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie usunięto użytkownika`, {
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
                console.log(error.response);
            }
        );
    }

    const handleClick = () => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        deleteUserDetailsAPI(editedUser.id);
        getUserDetailsAPI();
    }

    return (
        <Grid container component="main" direction="column" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <label>Czy na pewno chcesz usunąć tego użytkownika?</label>
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
    );
}

export default DeleteUserForm;