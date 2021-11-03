import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@mui/material/Button';
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

const deleteNewsAPI = (id) => {
    Repository.deleteRequest(resourceAPI, id).then(
        () => {
            toast.success(`Pomyślnie usunięto aktualność`, {
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
const DeleteNewsForm = ({ setOpenPopup, getNewsAPI, newsId }) => {
    const classes = useStyles();

    const handleClick = () => {
        deleteNewsAPI(newsId);
        getNewsAPI();
    }

    return (
        <Grid container component="main" direction="column" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <label>Czy na pewno chcesz usunąć tę aktualność?</label>
            </Grid>
            <Grid container xs={true} sm={true} md={true} className={classes.gridButton}>
                <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                    <Button onClick={() => handleClick()} variant="contained" color="success">Tak</Button>
                </Grid>
                <Grid item xs={true} sm={true} md={true} className={classes.gridButton}>
                    <Button onClick={() => setOpenPopup(false)} variant="contained" color="error">Nie</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DeleteNewsForm;