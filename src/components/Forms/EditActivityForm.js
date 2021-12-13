import React, { useContext, useState, useEffect } from 'react';
import {
    Grid,
    TextField,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Repository from '../../api/Repository';
import { UserContext } from '../../context/UserContext';
import Auth from '../../api/Auth';
import useTable from '../Tables/useTable';
import { Typography } from '@material-ui/core';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ButtonDeleteParticipant from './../Activities/ButtonDeleteParticipant';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Skeleton } from '@mui/material';
import ButtonAddPoints from '../Activities/ButtonAddPoints';
import AddPointsForm from '../Forms/AddPointsForm';
import AddPointsPopup from '../Popups/Popup';

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
        padding: theme.spacing(0)
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
    { id: 'childs_first_name', label: 'Imię dziecka:' },
    { id: 'childs_surname', label: 'Nazwisko dziecka:' },
    { id: 'points', label: 'Punkty:' },
    { id: 'actions', label: 'Akcje:', disableSorting: true }
]

const postParticipantsAPI = (resourceAPI, data, actions) => {
    Repository.add(resourceAPI, data).then(
        () => {
            toast.success(`Pomyślnie dodano członka do grupy`, {
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

const EditActivityForm = ({ getActivitiesAPI, setOpenPopup, editedGroup }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);
    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [kid, setKid] = useState();
    const [openAddPointsPopup, setOpenAddPointsPopup] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [participantId, setParticipantId] = useState();
    // eslint-disable-next-line no-unused-vars
    const [filter, setFilter] = useState({ filter: items => { return items; } });
    const {
        TableContainer,
        HeadTable,
        activitiesAfterPagingAndSorting,
    } = useTable(editedGroup.participants, headCells, filter);

    const validationSchema = yup.object({
        particpant: yup
            .string("Pole musi byc napisem")
            .required("Pole wymagane"),

    });

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
                setOpenPopup(false);
                getActivitiesAPI();
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        data = {
                            activities_id: editedGroup.id,
                            user_details_id: values.particpant,
                        }
                        postParticipantsAPI(resourceParticpantsAPI, data, actions);
                        setOpenPopup(false);
                        getActivitiesAPI();
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
        console.log("EditActivityForm")
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
                    <TableContainer >
                        <HeadTable />
                        <TableBody>
                            {
                                activitiesAfterPagingAndSorting().map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell className={classes.tabelCell}>{item.childs_first_name}</TableCell>
                                        <TableCell className={classes.tabelCell}>{item.childs_surname}</TableCell>
                                        <TableCell className={classes.tabelCell}>{item.points}</TableCell>
                                        <TableCell className={classes.tabelCell}>{JSON.parse(Auth.getUserId()) === item.leader_id || JSON.parse(Auth.getRole()) === "ADMIN" ?
                                            <Box sx={{ '& button': { m: 1 } }}>
                                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                                    <ButtonAddPoints
                                                        setOpenPopup={setOpenAddPointsPopup}
                                                        openPopup={openAddPointsPopup}
                                                        getActivitiesAPI={getActivitiesAPI}
                                                        child={item}
                                                        setKid={setKid}
                                                    />
                                                    <ButtonDeleteParticipant activityId={item.id} setOpenPopup={setOpenPopup} getActivitiesAPI={getActivitiesAPI} participantId={item.user_id} />
                                                </div>
                                            </Box > : null}
                                        </TableCell>
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </TableContainer>
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
                            {userDetails.map(userDetails => (
                                <MenuItem key={userDetails.id} value={userDetails.id}>{userDetails.childs_first_name} {userDetails.childs_surname}</MenuItem>
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
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >
                                    Dodaj uczestnika
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                            <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => setOpenPopup(false)}
                                >
                                    Zamknij
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
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
                    child={kid}
                />
            </AddPointsPopup>
        </>
    );
}

export default EditActivityForm;