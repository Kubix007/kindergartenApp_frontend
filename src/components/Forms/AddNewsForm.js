import React, { useContext } from 'react';
import {
    Grid,
} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Repository from '../../api/Repository';
import { UserContext } from '../../context/UserContext';
import Auth from '../../api/Auth';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

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
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
}));


const AddNewsForm = ({ getNewsAPI, setOpenPopup, userDetailsId, setUpdatingStatusPopup }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);

    const validationSchema = yup.object({
        title: yup
            .string()
            .max(36, "Pole może składać się maksymalnie z 15 znaków")
            .required("Pole wymagane"),
        description: yup
            .string()
            .max(250, "Pole może składać się maksymalnie z 250 znaków"),
        type: yup
            .string()
            .required("Pole wymagane"),
    });

    const postNewsAPI = (resourceAPI, data, actions) => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        Repository.add(resourceAPI, data).then(
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
                toast.error(`Nie udało się dodać ogłoszenia`, {
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
            title: "",
            description: "",
            type: "Ostrzeżenie",

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
        <Grid container component="main" xs={12}>
            <Grid item xs={12}>
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
                    <RadioGroup
                        name="type"
                        id="type"
                        style={{ padding: 10 }}
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    >
                        <FormControlLabel value="Ostrzeżenie" control={<Radio />} label="Ostrzeżenie" />
                        <FormControlLabel value="Informacja" control={<Radio />} label="Informacja" />
                    </RadioGroup>
                    <Grid className={classes.grid} container xs={12}>
                        <Grid className={classes.grid} item xs={12} sm={true} md={true}>
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