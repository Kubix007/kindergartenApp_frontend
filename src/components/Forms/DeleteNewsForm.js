import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceAPI = 'news';
const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
}));


const DeleteNewsForm = ({ setOpenPopup, getNewsAPI, newsId, setUpdatingStatusPopup }) => {
    const classes = useStyles();

    const deleteNewsAPI = (id) => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        Repository.deleteRequest(resourceAPI, id).then(
            () => {
                getNewsAPI();

            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się usunąć ogłoszenia`, {
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
        );
    }

    const handleClick = () => {
        deleteNewsAPI(newsId);
    }

    return (
        <Grid container component="main" direction="column" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <label>Czy na pewno chcesz usunąć to ogłoszenie?</label>
            </Grid>
            <Grid container xs={true} sm={true} md={true} className={classes.gridButton}>
                <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                    <Button id="confirmDeleteNewsButton" onClick={() => handleClick()} variant="contained" color="primary">Tak</Button>
                </Grid>
                <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                    <Button onClick={() => setOpenPopup(false)} variant="contained" color="primary">Nie</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DeleteNewsForm;