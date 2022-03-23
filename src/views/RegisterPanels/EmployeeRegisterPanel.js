import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Auth from '../../api/Auth';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import LoginImage from "../../svg/LoginImage.svg";
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

export default function EmployeeRegisterPanel({ backToMain }) {
    const classes = useStyles();
    const history = useHistory();
    const [employeeAccountDetails, setEmployeeAccountDetails] = useState(false);

    const validationSchema = yup.object({
        login: yup
            .string()
            .max(15, "Pole może składać się maksymalnie z 15 znaków")
            .required("Pole wymagane"),
        firstName: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków")
            .required("Pole wymagane"),
        surname: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków")
            .required("Pole wymagane"),
        city: yup
            .string()
            .max(20, "Pole może składać się maksymalnie z 20 znaków")
            .required("Pole wymagane"),
        street: yup
            .string()
            .max(50, "Pole może składać się maksymalnie z 50 znaków")
            .required("Pole wymagane"),
        phone: yup
            .string()
            .required("Pole wymagane")
            .matches(/^[\+]?[(]?[-\s]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{3,6}$/, "Nieprawidłowy format"),
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
            phone: "",
            city: "",
            street: "",
            password: "",
            passwordConfirmation: ""
        },
        onSubmit: (values, actions) => {
            Auth.register(values.login, values.email, values.firstName, values.surname, "-", "-", values.phone, values.city,
                values.street, values.password, values.passwordConfirmation).then(
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
                                login: "",
                                email: "",
                                firstName: "",
                                surname: "",
                                phone: "",
                                city: "",
                                street: "",
                                password: "",
                                passwordConfirmation: ""
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
        <>
            {!employeeAccountDetails ? <form className={classes.form} noValidate>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={backToMain}
                >
                    Wstecz
                </Button>
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
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => { setEmployeeAccountDetails((prevState) => !prevState); e.preventDefault() }}
                >
                    Dalej
                </Button>
            </form> : <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => setEmployeeAccountDetails((prevState) => !prevState)}
                >
                    Wstecz
                </Button>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="Imię"
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
                    label="Nazwisko"
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
                    id="city"
                    label="Miejscowość"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    onBlur={formik.handleBlur}

                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="street"
                    label="Ulica"
                    name="street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={formik.touched.street && Boolean(formik.errors.street)}
                    helperText={formik.touched.street && formik.errors.street}
                    onBlur={formik.handleBlur}

                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Telefon"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
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
            </form>
            }
        </>
    );
}