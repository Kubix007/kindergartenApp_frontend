import React, { useContext, useState, useEffect } from 'react';
import {
    Grid,
    TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Repository from '../../api/Repository';
import { UserContext } from '../../context/UserContext';
import Auth from '../../api/Auth';
import { Typography } from '@material-ui/core';
import ButtonDeleteParticipant from './../Activities/ButtonDeleteParticipant';
import { Skeleton } from '@mui/material';
import ButtonAddPoints from '../Activities/ButtonAddPoints';
import AddPointsForm from '../Forms/AddPointsForm';
import AddPointsPopup from '../Popups/Popup';
import LoadingTableParticipants from '../Tables/LoadingTableParticipants';

const resourceParticpantsAPI = 'participants';
const resourceUserDetailsAPI = 'user_details';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vh',
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1)
    },
    grid2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
}));

const headCells = [
    { id: 'first_name', label: 'Imię dziecka:' },
    { id: 'surname', label: 'Nazwisko dziecka:' },
    { id: 'points', label: 'Punkty:' },
    { id: 'actions', label: '' },
    { id: 'actions', label: '' }

]


const EditActivityForm = ({ getActivitiesAPI, setOpenPopup, editedGroup, setUpdatingStatusPopup, refreshAfterNewParticipant, refreshAfterNewPoints, refreshAfterDeleteParticipant }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [kid, setKid] = useState();
    const [openAddPointsPopup, setOpenAddPointsPopup] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [participantId, setParticipantId] = useState();
    // eslint-disable-next-line no-unused-vars

    const validationSchema = yup.object({
        particpant: yup
            .string("Pole musi byc napisem")
            .required("Pole wymagane"),

    });

    const postParticipantsAPI = (resourceAPI, data, actions) => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        Repository.add(resourceAPI, data).then(
            () => {
                refreshAfterNewParticipant();
                actions.resetForm({
                    values: {
                        particpant: "",
                    },
                })

            },
            (error) => {
                console.log('Error', error)
                toast.error(`Nie udało się dodać członka do grupy`, {
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
                        particpant: "",
                    },
                })
            }
        );
    }

    const formik = useFormik({
        initialValues: {
            particpant: "",
        },
        onSubmit: (values, actions) => {
            setParticipantId(values.particpant);
            let data = null;
            if (typeof user !== "undefined") {
                data = {
                    activities_id: editedGroup.id,
                    user_details_id: values.particpant,
                }
                postParticipantsAPI(resourceParticpantsAPI, data, actions);
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        data = {
                            activities_id: editedGroup.id,
                            user_details_id: values.particpant,
                        }
                        postParticipantsAPI(resourceParticpantsAPI, data, actions);
                    },
                    (error) => {
                        console.log(error.response);
                    }
                )
            }
        },
        validationSchema: validationSchema,

    });

    const getUserDetailsAPI = () => {
        Repository.getAll(resourceUserDetailsAPI).then(
            (data) => {
                setTimeout(() => {
                    setUserDetails(data.data);
                    setIsLoading(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getUserDetailsAPI();
    }, []);

    return (
        <>
            <Grid container component="main" xs={12} sm={true} md={true} className={classes.root}>
                <Grid item xs={true} sm={true} md={true}>
                    <Typography
                        variant="inherit"
                        component="div"
                    >
                        {`Nazwa grupy: ${editedGroup.name}`}
                    </Typography>
                    <Typography
                        variant="inherit"
                        component="div"
                    >
                        {`Prowadzący: ${editedGroup.leader}`}
                    </Typography>
                    <Typography
                        variant="inherit"
                        component="div"
                    >
                        {`Liczba członków: ${editedGroup.participantCount}`}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        Dodaj uczestnika:
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        {!isLoading ? <TextField
                            name="particpant"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="particpant"
                            label="Uczestnik"
                            select
                            in
                            value={formik.values.particpant}
                            onChange={formik.handleChange}
                            error={formik.touched.particpant && Boolean(formik.errors.particpant)}
                            helperText={formik.touched.particpant && formik.errors.particpant}
                            onBlur={formik.handleBlur}
                        >
                            {userDetails.filter((row) => row.user.role === "USER" || row.user.role === "ADMIN").map(userDetails => (
                                <option style={{ fontSize: "20px" }} key={userDetails.id} value={userDetails.id}>{userDetails.first_name} {userDetails.surname}</option>
                            ))}
                        </TextField> : <TextField
                            name="particpant"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="particpant"
                            label="Uczestnik"
                            select
                            in
                        >
                            <Skeleton variant="rectangular" />
                        </TextField>}
                        <Grid className={classes.grid2} container xs={12} sm={true} md={true}>
                            <Grid className={classes.grid2} item xs={true} sm={true} md={true}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Dodaj uczestnika
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    < table class="employeesDashboard" >
                        <caption class="employeesDashboard" >UCZESTNICY</caption>
                        <thead class="employeesDashboard">
                            <tr>
                                {headCells.map(headCell => (
                                    <th scope="col" key={headCell.id}>{headCell.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading ? editedGroup.participants.map((participant) => (
                                <tr class="employeesDashboard"
                                    key={participant.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <td class="employeesDashboard" data-label="Imię">{participant.first_name}</td>
                                    <td class="employeesDashboard" data-label="Nazwisko">{participant.surname}</td>
                                    <td class="employeesDashboard" data-label="Punkty">{participant.points}</td>
                                    <td class="employeesDashboard" id="employeesActionsWindow">{JSON.parse(Auth.getRole()) === "ADMIN" || parseInt(Auth.getUserId()) === editedGroup.user_id.user_id?
                                        <ButtonAddPoints
                                            setOpenPopup={setOpenAddPointsPopup}
                                            openPopup={openAddPointsPopup}
                                            getActivitiesAPI={getActivitiesAPI}
                                            child={participant}
                                            setKid={setKid}
                                        />
                                        : null}
                                    </td>
                                    <td class="employeesDashboard" id="employeesActionsWindow">{JSON.parse(Auth.getRole()) === "ADMIN" || parseInt(Auth.getUserId()) === editedGroup.user_id.user_id?
                                        <ButtonDeleteParticipant activityId={editedGroup.id} setUpdatingStatusPopup={setUpdatingStatusPopup} setOpenPopup={setOpenPopup} refreshAfterDeleteParticipant={refreshAfterDeleteParticipant} participantId={participant.id} />
                                        : null}
                                    </td>
                                </tr>
                            )) : <LoadingTableParticipants />}
                        </tbody>
                    </table >
                </Grid>
            </Grid>
            <AddPointsPopup
                openPopup={openAddPointsPopup}
                setOpenPopup={setOpenAddPointsPopup}
                title="Dodaj punkty"
            >
                <AddPointsForm
                    getActivitiesAPI={getActivitiesAPI}
                    setOpenPopup={setOpenAddPointsPopup}
                    setEditActivityPopup={setOpenPopup}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                    refreshAfterNewPoints={refreshAfterNewPoints}
                    child={kid}

                />
            </AddPointsPopup>
        </>
    );
}

export default EditActivityForm;