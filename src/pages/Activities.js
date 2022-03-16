import React, { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, Toolbar } from '@material-ui/core';
import PageHeader from '../components/PageHeader';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import Repository from '../api/Repository';
import LoadingTable from '../components/Tables/LoadingTable';
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
        display: 'flex',
        justifyContent: 'space-between'
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
    { id: 'participantCount', label: 'Liczba uczestników:', isAdmin: false, },
    { id: 'actions', label: 'Akcje:', isAdmin: false }
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

            <Paper elevation={6} className={classes.pageContent}>
                {JSON.parse(Auth.getRole()) === "ADMIN" ? <Toolbar className={classes.buttons}>
                    <ButtonAddActivity setOpenPopup={setOpenAddActivityPopup} disabled={buttonDisabled} />
                </Toolbar> : null}
                {activities.length === 0 && !updatingStatusPopup ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h1>Niestety żadne zajęcia nie zostały jeszcze stworzone ;(</h1></div> : null}
                <TableContainer>
                    <Table className={classes.table} sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {activities.length !== 0 ? headCells.filter(headCell => headCell.isAdmin === false).map(headCell => (
                                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                                )) : null}
                            </TableRow>
                        </TableHead>
                        {!updatingStatusPopup ? <TableBody>
                            {activities.map((activity) => (
                                <TableRow
                                    key={activity.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{activity.name}</TableCell>
                                    <TableCell>{activity.leader}</TableCell>
                                    <TableCell>{activity.participantCount}</TableCell>
                                    <TableCell>{JSON.parse(Auth.getRole()) === "ADMIN" ?
                                        <Box justifyContent="space-evenly" display="flex">
                                            <ButtonEditActivity activity={activity} setEditedGroup={setEditedGroup} setOpenPopup={setOpenEditActivityPopup} openPopup={openEditActivityPopup} />
                                            <ButtonDeleteActivity activity={activity} getActivitiesAPI={getActivitiesAPI} openPopup={openDeleteActivityPopup} setOpenPopup={setOpenDeleteActivityPopup} />
                                        </Box > : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody> : <LoadingTable />}
                    </Table>
                </TableContainer>
            </Paper>
            <AddActivityPopup
                openPopup={openAddActivityPopup}
                setOpenPopup={setOpenAddActivityPopup}
                title="Dodaj nową grupę"
            >
                <AddActivityForm
                    getActivitiesAPI={getActivitiesAPI}
                    setOpenPopup={setOpenAddActivityPopup}
                    employees={employees}
                />
            </AddActivityPopup>
            <EditActivityPopup
                openPopup={openEditActivityPopup}
                setOpenPopup={setOpenEditActivityPopup}
                title="Edytuj grupę"
                maxWidth="lg"
            >
                <EditActivityForm
                    getActivitiesAPI={getActivitiesAPI}
                    setOpenPopup={setOpenEditActivityPopup}
                    editedGroup={editedGroup}
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
        </>
    );
}
export default Activities;