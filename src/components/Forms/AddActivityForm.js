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

const resourceAPI = 'activities';

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

const postActivityAPI = (resourceAPI, data, actions) => {
    Repository.add(resourceAPI, data).then(
        () => {
            toast.success(`Pomyślnie dodano grupę`, {
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
                    name: "",
                    leader: "",
                },
            })

        },
        (error) => {
            console.log('Error', error)
            toast.error(`Nie udało się dodać grupy`, {
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
                    name: "",
                    leader: "",
                },
            })
        }
    );
}

const AddActivityForm = ({ getActivitiesAPI, setOpenPopup, employees }) => {
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);

    const validationSchema = yup.object({
        name: yup
            .string("Pole musi byc napisem")
            .required("Pole wymagane"),
        leader: yup
            .string("Pole musi byc napisem")
            .required("Pole wymagane"),

    });

    const formik = useFormik({
        initialValues: {
            name: "",
            leader: "",
        },
        onSubmit: (values, actions) => {
            let data = null;
            let leaderName = employees.filter(x => x.id === values.leader);
            leaderName = `${leaderName[0].first_name} ${leaderName[0].surname}`;
            if (typeof user !== "undefined") {
                data = {
                    name: values.name,
                    leader: leaderName,
                    leader_id: values.leader,
                }
                console.log(data)
                postActivityAPI(resourceAPI, data, actions);
                setOpenPopup(false);
                getActivitiesAPI();
            } else {
                Auth.getUser().then(
                    (response) => {
                        setUser(response.data);
                        data = {
                            name: values.name,
                            leader: leaderName,
                            leader_id: values.leader,
                        }
                        postActivityAPI(resourceAPI, data, actions);
                        console.log(data)
                        setOpenPopup(false);
                        getActivitiesAPI();
                    },
                    (error) => {
                        console.log(error.response);
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
                        name="name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nazwa zajęć"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onBlur={formik.handleBlur}

                    />
                    <TextField
                        name="leader"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="leader"
                        label="Prowadzący"
                        select
                        in
                        value={formik.values.leader}
                        onChange={formik.handleChange}
                        error={formik.touched.leader && Boolean(formik.errors.leader)}
                        helperText={formik.touched.leader && formik.errors.leader}
                        onBlur={formik.handleBlur}
                    >
                        {employees.length > 0 ? employees.map(employee => (
                            <MenuItem key={employee.id} value={employee.id}>{employee.first_name} {employee.surname}</MenuItem>
                        )) : <MenuItem>Brak dostępnych prowadzących</MenuItem>}
                    </TextField>
                    <Grid className={classes.grid} container xs={12} sm={true} md={true}>
                        <Grid className={classes.grid} item xs={true} sm={true} md={true}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
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
        </Grid>
    );
}

export default AddActivityForm;