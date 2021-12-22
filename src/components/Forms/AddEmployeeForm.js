import React, { useContext } from 'react'
import {
    Grid,
    TextField,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Auth from '../../api/Auth';
import MenuItem from '@mui/material/MenuItem';

const resourceAPI = 'user_details';
const resourceEmployeesAPI = 'employees';

const useStyles = makeStyles((theme) => ({
    gridButton: {
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
        padding: theme.spacing(1),
    },
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

const AddEmployeeForm = ({ setOpenPopup, getUserDetailsAPI, userDetails, setUpdatingStatusPopup }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);

    const postEmployeesAPI = (data) => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        Repository.add(resourceEmployeesAPI, data).then(
            () => {
            },
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }
    const deleteUserDetailsAPI = (id, actions) => {
        Repository.deleteRequest(resourceAPI, id).then(
            () => {
                getUserDetailsAPI();
                toast.success(`Pomyślnie dodano pracownika`, {
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
                        user: "",
                        position_name: "",
                        phone: "",
                        town: "",
                    },
                })
            },
            (error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    const validationSchema = yup.object({
        user: yup
            .string("Pole musi byc napisem")
            .required("Pole wymagane"),
        position_name: yup
            .string()
            .required("Pole wymagane"),
        phone: yup
            .string()
            .required("Pole wymagane"),
        town: yup
            .string()
            .required("Pole wymagane"),
    });

    const formik = useFormik({
        initialValues: {
            user: "",
            position_name: "",
            phone: "",
            town: "",
        },
        onSubmit: (values, actions) => {
            let data = null;
            let employee = userDetails.filter(x => x.id === values.user);
            let employeeName = `${employee[0].childs_first_name}`;
            let employeeSurname = `${employee[0].childs_surname}`;

            if (typeof user !== "undefined") {
                data = {
                    user_id: values.user,
                    first_name: employeeName !== null ? employeeName : "Brak imienia",
                    surname: employeeSurname !== null ? employeeSurname : "Brak nazwiska",
                    position_name: values.position_name,
                    phone: values.phone,
                    town: values.town,
                }
                postEmployeesAPI(data);
                deleteUserDetailsAPI(values.user, actions);
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        data = {
                            user_id: values.user,
                            first_name: employeeName,
                            surname: employeeSurname,
                            position_name: values.position_name,
                            phone: values.phone,
                            town: values.town,
                        }
                        postEmployeesAPI(data);
                        deleteUserDetailsAPI(values.user, actions);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
        },
        validationSchema: validationSchema,

    });

    return (
        <Grid container component="main" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        name="user"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="Użytkownik"
                        select
                        in
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        error={formik.touched.user && Boolean(formik.errors.user)}
                        helperText={formik.touched.user && formik.errors.user}
                        onBlur={formik.handleBlur}
                    >
                        {userDetails.map(userDetails => (
                            <MenuItem key={userDetails.id} value={userDetails.id}>{userDetails.childs_first_name} {userDetails.childs_surname}</MenuItem>
                        ))}
                    </TextField>
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
                    <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                            >
                                Dodaj
                            </Button>
                        </Grid>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                            <Button
                                variant="contained"
                                color="error"
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

export default AddEmployeeForm;