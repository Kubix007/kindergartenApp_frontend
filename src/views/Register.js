import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginImage from '../svg/LoginImage.svg';
import EmployeeRegisterPanel from './RegisterPanels/EmployeeRegisterPanel';
import UserRegisterPanel from './RegisterPanels/UserRegisterPanel';

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
    const [userPanel, setUserPanel] = useState(false);
    const [employeePanel, setEmployeePanel] = useState(false);

    useEffect(() => {

    }, []);

    const backToMain = () => {
        setUserPanel(false)
        setEmployeePanel(false)
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
                    {userPanel ? <><Typography component="h1" variant="h5">Konto dziecka</Typography><UserRegisterPanel backToMain={backToMain} /> </> : () => setUserPanel(false)}
                    {employeePanel ? <><Typography component="h1" variant="h5">Konto nauczyciela</Typography><EmployeeRegisterPanel backToMain={backToMain} /></> : () => setEmployeePanel(false)}
                    {!userPanel && !employeePanel ? <><Typography component="h1" variant="h5">Rejestracja</Typography><Grid container alignItems='center' justifyContent="center">
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => setUserPanel((prevState) => !prevState)}
                            >
                                Stwórz konto dziecka
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => setEmployeePanel((prevState) => !prevState)}
                            >
                                Stwórz konto nauczyciela
                            </Button>
                        </Grid>
                    </Grid></> : null}
                    <Grid container className={classes.helpLinks}>
                        <Grid item>
                            <NavLink to="/logowanie">Jesteś już zarejestrowany? Zaloguj się</NavLink>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}