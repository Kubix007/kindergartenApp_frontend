import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceAPI = 'employees';
const resourceUserDetails = 'user_details';

const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
}));

const DeleteEmployeeForm = ({ setOpenPopup, getEmployeesAPI, editedEmployee, setUpdatingStatusPopup, activityLeadersId }) => {
    const classes = useStyles();

    const deleteEmployeesAPI = (employeeId) => {
        let leadersId = activityLeadersId;
        if (leadersId.filter(x => x.leader_id === editedEmployee.id).length > 0) {
            setUpdatingStatusPopup(false);
            toast.error(`Usuń najpierw zajęcia przypisane do pracownika`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else {
            setUpdatingStatusPopup(true);
            Repository.deleteRequest(resourceAPI, employeeId).then(
                () => {
                    postUserDetailsAPI()
                },
                (error) => {
                    console.log(error.response.data.message);
                }
            );
        }
    }

    const postUserDetailsAPI = () => {
        setUpdatingStatusPopup(false);
        let data = {
            user_id: editedEmployee.user_id,
            first_name: editedEmployee.first_name,
            surname: editedEmployee.surname,
            parents_first_name: "",
            parents_surname: "",
            parents_phone: editedEmployee.phone,
            town: editedEmployee.town,
            points: 0
        }
        Repository.add(resourceUserDetails, data).then(
            () => {
                toast.success(`Pomyślnie usunięto pracownika`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                getEmployeesAPI();
            },
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    const handleClick = () => {
        setOpenPopup(false);
        deleteEmployeesAPI(editedEmployee.id);
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