import React, { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, Toolbar, Container } from '@material-ui/core';
import PageHeader from '../components/PageHeader';
import Repository from '../api/Repository';
import ButtonAddActivity from '../components/Activities/ButtonAddActivity';
import AddActivityForm from '../components/Forms/AddActivityForm';
import AddActivityPopup from '../components/Popups/Popup';
import EditActivityPopup from '../components/Popups/Popup';
import EditActivityForm from '../components/Forms/EditActivityForm';
import ButtonDeleteActivity from './../components/Activities/ButtonDeleteActivity';
import ButtonEditActivity from './../components/Activities/ButtonEditActivity';
import Box from '@mui/material/Box';
import Auth from '../api/Auth';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';
import { toast } from 'react-toastify';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './ActivitiesTable.css';
import DeleteActivityForm from '../components/Forms/DeleteActivityForm';
import DeleteActivityPopup from '../components/Popups/Popup';

const resourceActivitiesAPI = 'activities';
const resourceEmployeesAPI = 'employees';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
    },
    toolbar: {
        padding: theme.spacing(3),
    },
    buttons: {
        paddingLeft: theme.spacing(5)

    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    table: {
        marginTop: theme.spacing(3),
        display: 'table',
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary,
            backgroundColor: theme.palette.grey[50],
            boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .1)',
            minWidth: '100px'
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.grey[50],
            cursor: 'pointer',
        },
    },
}))

const headCells = [
    { id: 'name', label: 'Nazwa zajęć:', isAdmin: false, },
    { id: 'leader', label: 'Prowadzący:', isAdmin: false, },
    { id: 'participantCount', label: 'Uczestnicy:', isAdmin: false, },
    { id: 'description', label: 'Opis:', isAdmin: false, },
    { id: 'actions', label: 'Akcje:', isAdmin: true }
]

const Activities = () => {

    const classes = useStyles();
    const [activities, setActivities] = useState([0]);
    const [employees, setEmployees] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [openAddActivityPopup, setOpenAddActivityPopup] = useState(false);
    const [openEditActivityPopup, setOpenEditActivityPopup] = useState(false);
    const [openDeleteActivityPopup, setOpenDeleteActivityPopup] = useState(false);
    const [editedGroup, setEditedGroup] = useState();
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);
    const [activityParticipants, setActivityParticipants] = useState(false);
    const [activityId, setActivityId] = useState(false);



    const getActivitiesAPI = () => {
        Repository.getAll(resourceActivitiesAPI).then(
            (data) => {
                setActivities(data.data.activities);
                setIsLoading(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const refreshAfterNewParticipant = () => {
        Repository.getAll(resourceActivitiesAPI).then(
            (data) => {
                setActivities(data.data.activities);
                setIsLoading(false);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie dodano członka do grupy`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulNewParticipantToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się dodać członka do grupy`, {
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

    const refreshAfterDeleteParticipant = () => {
        Repository.getAll(resourceActivitiesAPI).then(
            (data) => {
                setActivities(data.data.activities);
                setIsLoading(false);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie usunięto uczestnika`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulDeleteParticipantToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się usunąć uczestnika`, {
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

    const refreshAfterNewPoints = () => {
        Repository.getAll(resourceActivitiesAPI).then(
            (data) => {
                setActivities(data.data.activities);
                setIsLoading(false);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie zaktualizowano punkty`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulAddPointsToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się zaktualizować punktów`, {
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

    const refreshAfterAddActivity = () => {
        Repository.getAll(resourceActivitiesAPI).then(
            (data) => {
                setActivities(data.data.activities);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie dodano grupę`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulNewGroupToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się dodać grupy`, {
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

    const refreshAfterDeleteActivity = () => {
        Repository.getAll(resourceActivitiesAPI).then(
            (data) => {
                setActivities(data.data.activities);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie usunięto grupę`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulDeletedGroupToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się usunąć grupy`, {
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

    const getEmployeesAPI = () => {
        Repository.getAll(resourceEmployeesAPI).then(
            (data) => {
                setEmployees(data.data);
                setButtonDisabled(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getActivitiesAPI();
        getEmployeesAPI();
        if (!buttonDisabled && !isLoading) {
            setUpdatingStatusPopup(false);
        }
    }, [buttonDisabled, isLoading]);

    return (
        <>
            <PageHeader
                title="Zajęcia"
                subTitle="Dodatkowe grupy zajęciowe"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>
                {JSON.parse(Auth.getRole()) === "ADMIN" && !updatingStatusPopup ? <Toolbar className={classes.buttons}>
                    <ButtonAddActivity setOpenPopup={setOpenAddActivityPopup} disabled={buttonDisabled} />
                </Toolbar> : null}
                <Paper elevation={6} className={classes.pageContent}>
                    {activities.length === 0 && !updatingStatusPopup ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h2>Brak istniejących zajęć</h2></div> : null}
                    {!updatingStatusPopup && activities.length > 0 ?
                        <table class="mainActivities">
                            <caption class="mainActivities">ZAJĘCIA</caption>
                            <thead class="mainActivities">
                                <tr class="mainActivities">
                                    {activities.length !== 0 ? headCells.filter(headCell => headCell.isAdmin === false).map(headCell => (
                                        <th scope="col" key={headCell.id}>{headCell.label}</th>
                                    )) : null}
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((activity) => (
                                    <tr class="mainActivities">
                                        <td class="mainActivities" data-label="Nazwa zajęć">{activity.name}</td>
                                        <td class="mainActivities" data-label="Prowadzący">{activity.leader}</td>
                                        <td class="mainActivities" data-label="Liczba uczestników">{activity.participantCount}</td>
                                        <td class="mainActivities" data-label='Opis' ><p style={{ padding: 10 }}>{activity.description}</p></td>
                                        <td class="mainActivities" data-label="Akcje">{JSON.parse(Auth.getRole()) === "ADMIN" || parseInt(Auth.getUserId()) === activity.user_id.user_id ?
                                            <Box justifyContent="space-evenly" display="flex">
                                                <ButtonEditActivity activity={activity} setEditedGroup={setEditedGroup} setOpenPopup={setOpenEditActivityPopup} openPopup={openEditActivityPopup} />
                                                <ButtonDeleteActivity activity={activity} setActivityParticipants={setActivityParticipants} setActivityId={setActivityId} activityParticipantCount={activity.participantCount} activityId={activity.id} refreshAfterDeleteActivity={refreshAfterDeleteActivity} setUpdatingStatusPopup={setUpdatingStatusPopup} getActivitiesAPI={getActivitiesAPI} openPopup={openDeleteActivityPopup} setOpenPopup={setOpenDeleteActivityPopup} />
                                            </Box > : null}
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        : null}
                </Paper>
            </Container>
            <AddActivityPopup
                openPopup={openAddActivityPopup}
                setOpenPopup={setOpenAddActivityPopup}
                title="Dodaj nową grupę"
            >
                <AddActivityForm
                    getActivitiesAPI={refreshAfterAddActivity}
                    setOpenPopup={setOpenAddActivityPopup}
                    employees={employees}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </AddActivityPopup>
            <EditActivityPopup
                openPopup={openEditActivityPopup}
                setOpenPopup={setOpenEditActivityPopup}
                title="Edytuj grupę"
                onClose={() => setOpenEditActivityPopup(false)}
                maxWidth="lg"
            >
                <EditActivityForm
                    refreshAfterNewParticipant={refreshAfterNewParticipant}
                    refreshAfterNewPoints={refreshAfterNewPoints}
                    refreshAfterDeleteParticipant={refreshAfterDeleteParticipant}
                    getActivitiesAPI={getActivitiesAPI}
                    setOpenPopup={setOpenEditActivityPopup}
                    editedGroup={editedGroup}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </EditActivityPopup>
            <UpdatingStatusPopup
                openPopup={updatingStatusPopup}
                setOpenPopup={setUpdatingStatusPopup}
                isTitle={false}
            >
                <UpdatingStatusForm
                    setOpenPopup={updatingStatusPopup}
                />
            </UpdatingStatusPopup>
            <DeleteActivityPopup
                openPopup={openDeleteActivityPopup}
                setOpenPopup={setOpenDeleteActivityPopup}
                title="Potwierdzenie akcji"
            >
                <DeleteActivityForm
                    setOpenPopup={setOpenDeleteActivityPopup}
                    refreshAfterDeleteActivity={refreshAfterDeleteActivity}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                    activityId={activityId}
                    activityParticipants={activityParticipants}
                />
            </DeleteActivityPopup>
        </>
    );
}
export default Activities;