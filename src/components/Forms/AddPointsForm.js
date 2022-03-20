import React, { useContext } from 'react';
import {
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Repository from '../../api/Repository';
import { UserContext } from '../../context/UserContext';
import Auth from '../../api/Auth';

const resourceUserDetailsAPI = 'user_details';
const resourcePointsHistoryAPI = 'points_histories';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '50vh',
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0)
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
}));


const AddPointsForm = ({ getActivitiesAPI, setOpenPopup, child, setEditActivityPopup, setUpdatingStatusPopup, refreshAfterNewPoints }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);

    const validationSchema = yup.object({
        points: yup
            .number().integer("Liczba musi być całkowita")
            .required("Pole wymagane")
            .max(1000, "Maksymalnie 1000 pkt.")
            .typeError("Pole musi być liczbą"),
        description: yup
            .string()
            .max(250, "Pole może składać się maksymalnie z 250 znaków")
            .required("Pole wymagane"),
    });

    const putUserDetailsAPI = (resourceAPI, id, data, resourcePointsHistoryAPI, pointsHistoryData, actions) => {
        setUpdatingStatusPopup(true);
        setOpenPopup(false);
        setEditActivityPopup(false);
        Repository.update(resourceAPI, id, data).then(
            () => {
                postHistoryPointsAPI(resourcePointsHistoryAPI, pointsHistoryData, actions);
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się zaktualizować punktów`, {
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

    const postHistoryPointsAPI = (resourceAPI, data, actions) => {
        Repository.add(resourceAPI, data).then(
            () => {
                refreshAfterNewPoints();
                actions.resetForm({
                    values: {
                        points: "",
                        description: "",
                    },
                })
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się zaktualizować punktów`, {
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

    const formik = useFormik({
        initialValues: {
            points: "",
            description: "",
        },
        onSubmit: (values, actions) => {
            let userDetailsData = null;
            let pointsHistoryData = null;
            if (typeof user !== "undefined") {
                userDetailsData = {
                    points: parseInt(child.points) + parseInt(values.points),
                }
                pointsHistoryData = {
                    user_details_id: child.id,
                    points: values.points,
                    description: values.description,
                }
                putUserDetailsAPI(resourceUserDetailsAPI, child.id, userDetailsData, resourcePointsHistoryAPI, pointsHistoryData, actions);
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        userDetailsData = {
                            points: parseInt(child.points) + parseInt(values.points),
                        }
                        pointsHistoryData = {
                            user_details_id: child.id,
                            points: values.points,
                            description: values.description,
                        }
                        putUserDetailsAPI(resourceUserDetailsAPI, child.id, userDetailsData, resourcePointsHistoryAPI, pointsHistoryData, actions);
                    },
                    (error) => {
                        console.log(error);
                        toast.error(`Nie udało się zaktualizować punktów`, {
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
                )
            }
        },
        validationSchema: validationSchema,

    });

    return (
        <Grid container component="main" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <Typography
                    variant="inherit"
                    component="div"
                >
                    {`Imię i nazwisko:  ${child.first_name} ${child.surname}`}
                </Typography>
                <Typography
                    variant="inherit"
                    component="div"
                >
                    {`Posiadane punkty:  ${child.points}`}
                </Typography>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        name="points"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="points"
                        label="Punkty"
                        value={formik.values.points}
                        onChange={formik.handleChange}
                        error={formik.touched.points && Boolean(formik.errors.points)}
                        helperText={formik.touched.points && formik.errors.points}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        margin="normal"
                        variant='outlined'
                        fullWidth
                        id="description"
                        multiline
                        maxRows={6}
                        minRows={6}
                        label="Opis"
                        name="description"
                        value={formik.values.description}
                        onChange={e => {
                            if (e.nativeEvent.inputType === "insertLineBreak") return;
                            formik.handleChange(e)

                        }}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        onBlur={formik.handleBlur}
                        inputProps={{ maxLength: 250 }}
                    />
                    <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                id="confirmAddingPointsButton"
                            >
                                Dodaj
                            </Button>
                        </Grid>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenPopup(false)}
                            >
                                Anuluj
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default AddPointsForm;