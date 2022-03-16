import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import Auth from '../api/Auth';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginImage from '../svg/LoginImage.svg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.primary.dark,
    },
    paper: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    leftImage: {
        backgroundImage: "url(" + LoginImage + ")",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    helpLinks: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    const [accountDetails, setAccountDetails] = useState(false);

    const validationSchema = yup.object({
        login: yup
            .string()
            .required("Pole wymagane"),
        firstName: yup
            .string()
            .required("Pole wymagane"),
        surname: yup
            .string()
            .required("Pole wymagane"),
        email: yup
            .string()
            .required("Pole wymagane")
            .email("Wprowadź prawidłowy email"),
        password: yup
            .string()
            .required("Pole wymagane")
            .min(8, "Hasło musi się składać z co najmniej 8 znaków"),
        passwordConfirmation: yup
            .string()
            .required("Pole wymagane")
            .test('passwords-match', 'Hasła muszą być takie same', function (value) {
                return this.parent.password === value
            })
    })

    const formik = useFormik({
        initialValues: {
            login: "",
            email: "",
            firstName: "",
            surname: "",
            password: "",
            passwordConfirmation: ""
        },
        onSubmit: (values, actions) => {
            Auth.register(values.login, values.email, values.firstName, values.surname, values.password, values.passwordConfirmation).then(
                () => {
                    toast.success(`Sukces! Pomyślnie stworzono konto`, {
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
                            login: '',
                            email: '',
                            firstName: "",
                            surname: "",
                            password: '',
                            passwordConfirmation: ''
                        },
                    });
                    history.push("/logowanie");

                },
                (error) => {
                    console.log(error);
                    console.log(error.response);

                }
            );
        },
        validationSchema: validationSchema,

    });

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.leftImage} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Stwórz konto
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            name="login"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            error={formik.touched.login && Boolean(formik.errors.login)}
                            helperText={formik.touched.login && formik.errors.login}
                            onBlur={formik.handleBlur}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adres Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="Imię dziecka"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            onBlur={formik.handleBlur}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="surname"
                            label="Nazwisko dziecka"
                            name="surname"
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            error={formik.touched.surname && Boolean(formik.errors.surname)}
                            helperText={formik.touched.surname && formik.errors.surname}
                            onBlur={formik.handleBlur}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onBlur={formik.handleBlur}


                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirmation"
                            label="Powtórz haslo"
                            type="password"
                            id="passwordConfirmation"
                            value={formik.values.passwordConfirmation}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                            onBlur={formik.handleBlur}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Zarejestruj się
                        </Button>
                        <Grid container className={classes.helpLinks}>
                            <Grid item>
                                <NavLink to="/logowanie">Jesteś już zarejestrowany? Zaloguj się</NavLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}