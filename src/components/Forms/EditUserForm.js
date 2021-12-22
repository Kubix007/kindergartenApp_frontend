import React from 'react';
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
import Auth from '../../api/Auth';

const resourceUserDetailsAPI = 'user_details';

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

    const validationSchema = yup.object({
        childs_first_name: yup
            .string()
            .required("Pole wymagane"),
        childs_surname: yup
            .string()
            .required("Pole wymagane"),
        parents_first_name: yup
            .string()
            .required("Pole wymagane"),
        parents_surname: yup
            .string()
            .required("Pole wymagane"),
        parents_phone: yup
            .string()
            .required("Pole wymagane"),
        town: yup
            .string()
            .required("Pole wymagane"),
    });

    const formik = useFormik({
        initialValues: {
            childs_first_name: editedUser.childs_first_name ? editedUser.childs_first_name : "",
            childs_surname: editedUser.childs_surname ? editedUser.childs_surname : "",
            parents_first_name: editedUser.parents_first_name ? editedUser.parents_first_name : "",
            parents_surname: editedUser.parents_surname ? editedUser.parents_surname : "",
            parents_phone: editedUser.parents_phone ? editedUser.parents_phone : "",
            town: editedUser.town ? editedUser.town : "",
        },
        onSubmit: (values, actions) => {
            let data = null;
            if (typeof user !== "undefined") {
                data = {
                    childs_first_name: values.childs_first_name,
                    childs_surname: values.childs_surname,
                    parents_first_name: values.parents_first_name,
                    parents_surname: values.parents_surname,
                    parents_phone: values.parents_phone,
                    town: values.town,
                }
                updateUserDetailsAPI(editedUser.id, data, actions);
                setOpenPopup(false);
                getUserDetailsAPI();
            } else {
                Auth.getUser().then(
                    () => {
                        data = {
                            childs_first_name: values.childs_first_name,
                            childs_surname: values.childs_surname,
                            parents_first_name: values.parents_first_name,
                            parents_surname: values.parents_surname,
                            parents_phone: values.parents_phone,
                            town: values.town,
                        }
                        updateUserDetailsAPI(editedUser.id, data, actions);
                        setOpenPopup(false);
                        getUserDetailsAPI();
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
        },
        validationSchema: validationSchema,

    });

    const updateUserDetailsAPI = (userId, data, actions) => {
        setUpdatingStatusPopup(true);
        Repository.update(resourceUserDetailsAPI, userId, data).then(
            () => {
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie zmieniono użytkownika`, {
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
                        childs_first_name: "",
                        childs_surname: "",
                        parents_first_name: "",
                        parents_surname: "",
                        parents_phone: "",
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

    return (
        <Grid container component="main" xs={12} sm={true} md={true}>
            <Grid item xs={true} sm={true} md={true}>
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        name="childs_first_name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="childs_first_name"
                        label="Imię dziecka"
                        autoFocus
                        value={formik.values.childs_first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.childs_first_name && Boolean(formik.errors.childs_first_name)}
                        helperText={formik.touched.childs_first_name && formik.errors.childs_first_name}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="childs_surname"
                        label="Nazwisko dziecka"
                        name="childs_surname"
                        value={formik.values.childs_surname}
                        onChange={formik.handleChange}
                        error={formik.touched.childs_surname && Boolean(formik.errors.childs_surname)}
                        helperText={formik.touched.childs_surname && formik.errors.childs_surname}
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
                    <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>

                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                            >
                                Edytuj
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

export default EditUserForm;