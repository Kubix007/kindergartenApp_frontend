import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginImage from '../svg/LoginImage.svg';
import RobotLoginImage from '../svg/RobotLogin2.svg';
import Auth from '../api/Auth';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.primary.dark,
    },
    leftImage: {
        backgroundImage: "url(" + LoginImage + ")",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    downImage: {
        backgroundImage: "url(" + RobotLoginImage + ")",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

export default function Login(props) {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();


    const login = () => {
        Auth.login(email, password).then(
            (response) => {
                setAuth(Auth.IsLogged());
                setUser(response.user);
                props.history.push("/aktualnosci");
                toast.success(`Zalogowano pomyślnie`, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulLoginToast"

                });
            },
            (error) => {
                if (error.response.data.message === "Bad credentials") {
                    Auth.reset();
                    setAuth(Auth.IsLogged());
                    history.push("/logowanie");
                    toast.error(`Nieprawidłowe dane`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        toastId: "unsuccessfulLoginToast"
                    });
                }
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
                        Zaloguj się
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adres Email"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            id="loginButton"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={login}
                        >
                            Zaloguj się
                        </Button>
                        <Grid container className={classes.helpLinks}>
                            <Grid item>
                                <NavLink to="/rejestracja">Nie posiadasz konta? Zarejestruj się</NavLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}