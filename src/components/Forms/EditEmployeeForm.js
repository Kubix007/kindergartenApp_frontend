import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Repository from '../../api/Repository';
import Auth from '../../api/Auth';
import {
    Grid,
    TextField,
} from '@material-ui/core';

const resourceEmployeesAPI = 'employees';
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


const EditUserForm = ({ setOpenPopup, editedEmployee, getEmployeesAPI, setUpdatingStatusPopup }) => {
    const classes = useStyles();
    let dataUser = null;

    const validationSchema = yup.object({
        first_name: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków")

            .required("Pole wymagane"),
        surname: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków")

            .required("Pole wymagane"),
        position_name: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków")
            .required("Pole wymagane"),
        phone: yup
            .string()
            .required("Pole wymagane")
            .matches(/^[\+]?[(]?[-\s]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{3,6}$/, "Nieprawidłowy format"),
        email: yup
            .string()
            .email("Wprowadź prawidłowy email")
            .required("Pole wymagane"),
    });

    const formik = useFormik({
        initialValues: {
            first_name: editedEmployee.first_name ? editedEmployee.first_name : "",
            surname: editedEmployee.surname ? editedEmployee.surname : "",
            position_name: editedEmployee.position_name ? editedEmployee.position_name : "",
            phone: editedEmployee.phone ? editedEmployee.phone : "",
            email: editedEmployee.user.email ? editedEmployee.user.email : "",
        },
        onSubmit: (values, actions) => {
            let data = null;
            dataUser = null;
            if (typeof user !== "undefined") {
                data = {
                    first_name: values.first_name,
                    surname: values.surname,
                    position_name: values.position_name,
                    phone: values.phone,
                }
                dataUser = {
                    email: values.email,
                }
                updateEmployeesAPI(editedEmployee.id, data, actions, values);
            } else {
                Auth.getUser().then(
                    () => {
                        data = {
                            first_name: values.first_name,
                            surname: values.surname,
                            position_name: values.position_name,
                            phone: values.phone,
                            town: values.town,
                        }
                        dataUser = {
                            email: values.email,
                        }
                        updateEmployeesAPI(editedEmployee.id, data, actions, values);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
        },
        validationSchema: validationSchema,

    });

    const updateEmployeesAPI = (employeeId, data, actions, values) => {
        setUpdatingStatusPopup(true);
        setOpenPopup(false);
        Repository.update(resourceEmployeesAPI, employeeId, data).then(
            () => {
                if (editedEmployee.user.email !== values.email) {
                    updateUserAPI(editedEmployee.user_id, dataUser, actions);
                }
                else {
                    getEmployeesAPI();
                    actions.resetForm({
                        values: {
                            first_name: "",
                            surname: "",
                            position_name: "",
                            phone: "",
                            email: "",
                        }
                    })
                }
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się zmienić nauczyciela`, {
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
                getEmployeesAPI();
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
                toast.error(`Nie udało się zmienić nauczyciela`, {
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
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="first_name"
                        label="Imię"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="surname"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="surname"
                        label="Nazwisko"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="position_name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="position_name"
                        label="Stanowisko"
                        value={formik.values.position_name}
                        onChange={formik.handleChange}
                        error={formik.touched.position_name && Boolean(formik.errors.position_name)}
                        helperText={formik.touched.position_name && formik.errors.position_name}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="phone"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Telefon"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
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
                                id="confirmEditEmployeeButton"
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