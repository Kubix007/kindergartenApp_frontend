import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceAPI = 'employees';

const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
}));

const DeleteEmployeeForm = ({ setOpenPopup, getEmployeesAPI, editedEmployee, setUpdatingStatusPopup }) => {
    const classes = useStyles();

    // eslint-disable-next-line no-unused-vars
    const deleteEmployeesAPI = (id) => {
        Repository.deleteRequest(resourceAPI, id).then(
            () => {
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie usunięto pracownika`, {
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

    // eslint-disable-next-line no-unused-vars
    const postUserDetailsAPI = (resourceAPI, data, actions) => {
        Repository.add(resourceAPI, data).then(
            () => {
                toast.success(`Pomyślnie dodana aktualność`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                actions.resetForm({
                    values: {
                        title: "",
                        description: "",
                    },
                })
            },
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    const handleClick = () => {
        //setOpenPopup(false);
        ///setUpdatingStatusPopup(true);
        //deleteEmployeesAPI(editedEmployee.id);
        //getEmployeesAPI();
        console.log(editedEmployee);
    }

    return (
        <Grid container component="main" direction="column" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <label>Czy na pewno chcesz usunąć tego nauczyciela?</label>
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

export default DeleteEmployeeForm;