import React, { useContext } from 'react'
import {
    Grid,
    TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../../api/Repository';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Auth from '../../api/Auth';

const resourceEmployeesAPI = 'employees';
const resourceUserAPI = 'user';


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

const AddEmployeeForm = ({ setOpenPopup, getUserDetailsAPI, userDetails, setUpdatingStatusPopup, getEmployeesAPI }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);
    let data = null;

    const postEmployeesAPI = (data, employeeId, actions) => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        Repository.add(resourceEmployeesAPI, data).then(
            () => {
                updateUserDetails(employeeId, actions);
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się dodać nauczyciela`, {
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

    const updateUserDetails = (id, actions) => {
        Repository.update(resourceUserAPI, id, { role: "EMPLOYEE" }).then(
            () => {
                getEmployeesAPI();
                actions.resetForm({
                    values: {
                        user: "",
                        position_name: "",
                    },
                })
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                toast.error(`Nie udało się dodać nauczyciela`, {
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

    const validationSchema = yup.object({
        user: yup
            .string("Pole musi byc napisem")
            .required("Pole wymagane"),
        position_name: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków")
            .required("Pole wymagane"),
    });

    const formik = useFormik({
        initialValues: {
            user: "Wybierz użytkownika",
            position_name: "",
        },
        onSubmit: (values, actions) => {
            data = null;
            let employee = userDetails.filter(x => x.user_id === values.user);
            let employeeName = `${employee[0].first_name}`;
            let employeeSurname = `${employee[0].surname}`;

            if (typeof user !== "undefined") {
                data = {
                    user_id: values.user,
                    first_name: employeeName !== null ? employeeName : "Brak imienia",
                    surname: employeeSurname !== null ? employeeSurname : "Brak nazwiska",
                    position_name: values.position_name,
                    phone: employee[0].parents_phone,
                    town: employee[0].town,
                    street: employee[0].street,
                }
                postEmployeesAPI(data, employee[0].user.id, actions);
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        data = {
                            user_id: values.user,
                            first_name: employeeName,
                            surname: employeeSurname,
                            position_name: values.position_name,
                            phone: employee[0].parents_phone,
                            town: employee[0].town,
                            street: employee[0].street,

                        }
                        postEmployeesAPI(data, employee[0].user.id, actions);
                        //(data); - userID
                        //(employee[0].id) -- userdetailsID
                    },
                    (error) => {
                        console.log(error);
                        toast.error(`Nie udało się dodać nauczyciela`, {
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
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        name="user"
                        variant="outlined"
                        margin="normal"
                        required
                        id="user"
                        label="Użytkownik"
                        select
                        fullWidth
                        value={formik.values.user}
                        onChange={formik.handleChange}
                        error={formik.touched.user && Boolean(formik.errors.user)}
                        helperText={formik.touched.user && formik.errors.user}
                        onBlur={formik.handleBlur}
                    >
                        {userDetails.filter((row) => row.user.role === "USER" || row.user.role === "ADMIN").map(userDetails => (
                            <option style={{ fontSize: "20px" }} key={userDetails.id} value={userDetails.user_id}>
                                {userDetails.first_name} {userDetails.surname}
                            </option>
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

                    <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
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
        </Grid >
    );
}

export default AddEmployeeForm;