import React from 'react'
import {
    Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';

const resourceAPI = 'employees';
const resourceUserAPI = 'user';
const resourceUserDetailsAPI = 'user_details';

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

    const deleteEmployeesAPI = (employeeId, userId) => {
        let leadersId = activityLeadersId;
        let dataToUpdate =
        {
            first_name: editedEmployee.first_name,
            surname: editedEmployee.surname,
            parents_phone: editedEmployee.phone,
        }
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
                    updateUserDetails(userId, { role: "USER" }, dataToUpdate);
                },
                (error) => {
                    console.log(error.response.data.message);
                    toast.error(`Nie udało się usunąć nauczyciela`, {
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
    }

    const updateUserDetails = (id, editRole, dataToUpdate) => {
        Repository.update(resourceUserAPI, id, editRole).then(
            () => {
                updateUser(id, dataToUpdate);
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się usunąć nauczyciela`, {
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

    const updateUser = (id, dataToUpdate) => {
        Repository.update(resourceUserDetailsAPI, id, dataToUpdate).then(
            () => {
                getEmployeesAPI();
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się usunąć nauczyciela`, {
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
        setOpenPopup(false);
        deleteEmployeesAPI(editedEmployee.id, editedEmployee.user_id);
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