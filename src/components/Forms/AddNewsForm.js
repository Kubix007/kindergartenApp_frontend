import React, { useContext } from 'react';
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
import MenuItem from '@mui/material/MenuItem';

const resourceAPI = 'news';

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

const postNewsAPI = (resourceAPI, data, actions) => {
    Repository.add(resourceAPI, data).then(
        () => {
            toast.success(`Pomyślnie dodano ogłoszenie`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                toastId: "successfulNewsToast"

            });
            actions.resetForm({
                values: {
                    title: "",
                    description: "",
                },
            })
        },
        (error) => {
            console.log(error);
            console.log(error.response);
        }
    );
}

const newsType = [
    {
        id: "1",
        value: "Ostrzeżenie",
    },
    {
        id: "2",
        value: "Informacja",
    }
]

const AddNewsForm = ({ getNewsAPI, setOpenPopup, userDetailsId }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);

    const validationSchema = yup.object({
        title: yup
            .string()
            .required("Pole wymagane"),
        description: yup
            .string(),
        type: yup
            .string()
            .required("Pole wymagane"),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            type: "",
        },
        onSubmit: (values, actions) => {
            let data = null;
            if (typeof user !== "undefined") {
                data = {
                    user_details_id: userDetailsId,
                    title: values.title,
                    description: values.description,
                    author: user.login,
                    type: values.type,

                }
                postNewsAPI(resourceAPI, data, actions);
                setOpenPopup(false);
                getNewsAPI();
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        data = {
                            user_details_id: userDetailsId,
                            title: values.title,
                            description: values.description,
                            author: response.data.login,
                            type: values.type,
                        }
                        postNewsAPI(resourceAPI, data, actions);
                        setOpenPopup(false);
                        getNewsAPI();
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
                        name="title"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Nagłówek"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="description"
                        maxRows={11}
                        multiline
                        minRows={7}
                        label="Opis"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        name="type"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="type"
                        label="Typ aktualności"
                        select
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                        onBlur={formik.handleBlur}
                    >
                        {newsType.map(type => (
                            <MenuItem key={type.id} value={type.value}>{type.value}</MenuItem>
                        ))}
                    </TextField>
                    <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>
                            <Button variant="contained"
                                color="primary"
                                type="submit"

                            >
                                Dodaj
                            </Button>
                        </Grid>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>
                            <Button variant="contained"
                                color="primary"
                                type="submit"
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

export default AddNewsForm;