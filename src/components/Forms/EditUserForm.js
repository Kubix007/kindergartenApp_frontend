import React from 'react';
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
import Auth from '../../api/Auth';

const resourceUserDetailsAPI = 'user_details';
const resourceUserAPI = 'user';

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


const EditUserForm = ({ setOpenPopup, editedUser, getUserDetailsAPI, setUpdatingStatusPopup }) => {
    const classes = useStyles();
    let dataUser = null;

    const validationSchema = yup.object({
        first_name: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków"),
        surname: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków"),
        parents_first_name: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków"),
        parents_surname: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków"),
        parents_phone: yup
            .string()
            .required("Pole wymagane")
            .matches(/^[\+]?[(]?[-\s]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{3,6}$/, "Nieprawidłowy format"),
        town: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków"),
        street: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków"),
        email: yup
            .string()
            .email("Wprowadź prawidłowy email")
            .required("Pole wymagane"),
    });

    const formik = useFormik({
        initialValues: {
            first_name: editedUser.first_name ? editedUser.first_name : "",
            surname: editedUser.surname ? editedUser.surname : "",
            parents_first_name: editedUser.parents_first_name ? editedUser.parents_first_name : "",
            parents_surname: editedUser.parents_surname ? editedUser.parents_surname : "",
            parents_phone: editedUser.parents_phone ? editedUser.parents_phone : "",
            town: editedUser.town ? editedUser.town : "",
            street: editedUser.street ? editedUser.street : "",
            email: editedUser.user.email ? editedUser.user.email : "",
        },
        onSubmit: (values, actions) => {
            let data = null;
            dataUser = null;
            if (typeof user !== "undefined") {
                data = {
                    first_name: values.first_name,
                    surname: values.surname,
                    parents_first_name: values.parents_first_name,
                    parents_surname: values.parents_surname,
                    parents_phone: values.parents_phone,
                    town: values.town,
                    street: values.street,
                }
                dataUser = {
                    email: values.email,
                }
                updateUserDetailsAPI(editedUser.id, data, actions, values);
            } else {
                Auth.getUser().then(
                    () => {
                        data = {
                            first_name: values.first_name,
                            surname: values.surname,
                            parents_first_name: values.parents_first_name,
                            parents_surname: values.parents_surname,
                            parents_phone: values.parents_phone,
                            town: values.town,
                            street: values.street,

                        }
                        dataUser = {
                            email: values.email,
                        }
                        updateUserDetailsAPI(editedUser.id, data, actions, values);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
        },
        validationSchema: validationSchema,

    });

    const updateUserDetailsAPI = (userId, data, actions, values) => {
        setUpdatingStatusPopup(true);
        setOpenPopup(false);
        Repository.update(resourceUserDetailsAPI, userId, data).then(
            () => {
                if (editedUser.user.email !== values.email) {
                    updateUserAPI(editedUser.user_id, dataUser, actions);
                }
                else {
                    getUserDetailsAPI();
                    actions.resetForm({
                        values: {
                            first_name: "",
                            surname: "",
                            parents_first_name: "",
                            parents_surname: "",
                            parents_phone: "",
                            town: "",
                            street: "",
                            email: "",
                        },
                    })
                }

            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się zmienić użytkownika`, {
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

    const updateUserAPI = (userId, data, actions) => {
        Repository.update(resourceUserAPI, userId, data).then(
            () => {
                getUserDetailsAPI();
                actions.resetForm({
                    values: {
                        first_name: "",
                        surname: "",
                        position_name: "",
                        phone: "",
                        email: "",
                    }
                })
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się zmienić użytkownika`, {
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

    return (
        <Grid container component="main" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        name="first_name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="Imię"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="surname"
                        label="Nazwisko"
                        name="surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="parents_first_name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="parents_first_name"
                        label="Imię rodzica"
                        value={formik.values.parents_first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.parents_first_name && Boolean(formik.errors.parents_first_name)}
                        helperText={formik.touched.parents_first_name && formik.errors.parents_first_name}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="parents_surname"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="parents_surname"
                        label="Nazwisko rodzica"
                        value={formik.values.parents_surname}
                        onChange={formik.handleChange}
                        error={formik.touched.parents_surname && Boolean(formik.errors.parents_surname)}
                        helperText={formik.touched.parents_surname && formik.errors.parents_surname}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="parents_phone"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="parents_phone"
                        label="Telefon rodzica"
                        value={formik.values.parents_phone}
                        onChange={formik.handleChange}
                        error={formik.touched.parents_phone && Boolean(formik.errors.parents_phone)}
                        helperText={formik.touched.parents_phone && formik.errors.parents_phone}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="town"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="town"
                        label="Miasto"
                        value={formik.values.town}
                        onChange={formik.handleChange}
                        error={formik.touched.town && Boolean(formik.errors.town)}
                        helperText={formik.touched.town && formik.errors.town}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="street"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="street"
                        label="Ulica"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        error={formik.touched.street && Boolean(formik.errors.street)}
                        helperText={formik.touched.street && formik.errors.street}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}

                    />
                    <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                id="confirmEditUserButton"
                            >
                                Edytuj
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

export default EditUserForm;