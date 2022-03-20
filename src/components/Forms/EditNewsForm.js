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

const EditNewsForm = ({ getNewsAPI, newsId, setOpenPopup, newsTitle, newsDescription, setUpdatingStatusPopup }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);

    const validationSchema = yup.object({
        title: yup
            .string()
            .required("Pole wymagane"),
        description: yup
            .string()
            .max(250, "Maksymalna długość to 250 znaków"),
    });

    const updateNewsAPI = (resourceAPI, newsId, data, actions) => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        Repository.update(resourceAPI, newsId, data).then(
            () => {
                getNewsAPI();
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
                toast.error(`Nie udało się zmienić ogłoszenia`, {
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
            title: `${newsTitle}`,
            description: `${newsDescription}`,
        },
        onSubmit: (values, actions) => {
            let data = null;
            if (typeof user !== "undefined") {
                data = {
                    title: values.title,
                    description: values.description,
                    author: user.login,
                }
                updateNewsAPI(resourceAPI, newsId, data, actions);
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        data = {
                            title: values.title,
                            description: values.description,
                            author: response.data.login,
                        }
                        updateNewsAPI(resourceAPI, newsId, data, actions);
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
                        autoFocus
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
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
                                id="saveEditedNewsButton"
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

export default EditNewsForm;