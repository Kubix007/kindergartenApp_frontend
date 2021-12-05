import React, { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, Toolbar, TextField, InputAdornment } from '@material-ui/core';
import PageHeader from '../components/PageHeader';
import useTable from '../components/Tables/useTable';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Repository from '../api/Repository';
import LoadingTable from '../components/Tables/LoadingTable';
import { Skeleton } from '@mui/material';
import { Search } from '@material-ui/icons';
import ButtonAddActivity from '../components/Activities/ButtonAddActivity';
import AddActivityForm from '../components/Forms/AddActivityForm';
import AddActivityPopup from '../components/Popups/Popup';
import EditActivityPopup from '../components/Popups/Popup';
import EditActivityForm from '../components/Forms/EditActivityForm';
import ButtonDeleteActivity from './../components/Activities/ButtonDeleteActivity';
import ButtonEditActivity from './../components/Activities/ButtonEditActivity';
import Box from '@mui/material/Box';
import Auth from '../api/Auth';

const resourceActivitiesAPI = 'activities';
const resourceEmployeesAPI = 'employees';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    toolbar: {
        padding: theme.spacing(3),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    tabelCell: {
    }
}))

const headCells = [
    { id: 'name', label: 'Nazwa zajęć:' },
    { id: 'leader', label: 'Prowadzący:' },
    { id: 'participantCount', label: 'Liczba uczestników:' },
    { id: 'actions', label: 'Akcje:', disableSorting: true }


]

const Activities = () => {

    const classes = useStyles();
    const [activities, setActivities] = useState();
    const [employees, setEmployees] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [openAddActivityPopup, setOpenAddActivityPopup] = useState(false);
    const [openEditActivityPopup, setOpenEditActivityPopup] = useState(false);
    const [openDeleteActivityPopup, setOpenDeleteActivityPopup] = useState(false);
    const [editedGroup, setEditedGroup] = useState();
    const [filter, setFilter] = useState({ filter: items => { return items; } });
    const {
        TableContainer,
        HeadTable,
        PaginationTable,
        activitiesAfterPagingAndSorting,
    } = useTable(activities, headCells, filter);

    const getActivitiesAPI = () => {
        setIsLoading(true);
        Repository.getAll(resourceActivitiesAPI).then(
            (data) => {
                setTimeout(() => {
                    setActivities(data.data.activities);
                    setIsLoading(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getEmployeesAPI = () => {
        Repository.getAll(resourceEmployeesAPI).then(
            (data) => {
                setTimeout(() => {
                    setEmployees(data.data);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const handleSearch = (e) => {
        let target = e.target;
        setFilter({
            filter: items => {
                if (target.value === "") {
                    return items;
                }
                else {
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
                }
            }
        })

    }

    useEffect(() => {
        getActivitiesAPI();
        getEmployeesAPI();
    }, []);

    return (
        <>
            <PageHeader
                title="Zajęcia"
                subTitle="Dodatkowe grupy zajęciowe"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />

            <Paper elevation={6} className={classes.pageContent}>
                {JSON.parse(Auth.getRole()) === "ADMIN" ? <Toolbar className={classes.buttons}>
                    <ButtonAddActivity setOpenPopup={setOpenAddActivityPopup} />
                </Toolbar> : null}
                <Toolbar className={classes.toolbar}>
                    <TextField variant="outlined" label="Wyszukaj nazwę grupy"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TableContainer >
                    <HeadTable />
                    {!isLoading
                        ? (<TableBody>
                            {
                                activitiesAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell className={classes.tabelCell}>{item.name}</TableCell>
                                    <TableCell className={classes.tabelCell}>{item.leader}</TableCell>
                                    <TableCell className={classes.tabelCell}>{item.participantCount}/10</TableCell>
                                    <TableCell className={classes.tabelCell}>{JSON.parse(Auth.getUserId()) === item.leader_id || JSON.parse(Auth.getRole()) === "ADMIN" ?
                                        <Box sx={{ '& button': { m: 1 } }}>
                                            <div style={{ justifyContent: 'center', display: 'flex' }}>
                                                <ButtonEditActivity activity={item} setEditedGroup={setEditedGroup} setOpenPopup={setOpenEditActivityPopup} openPopup={openEditActivityPopup} />
                                                <ButtonDeleteActivity activity={item} getActivitiesAPI={getActivitiesAPI} openPopup={openDeleteActivityPopup} setOpenPopup={setOpenDeleteActivityPopup} />
                                            </div>
                                        </Box > : null}
                                    </TableCell>
                                </TableRow>)
                                )
                            }
                        </TableBody>)
                        : <LoadingTable />
                    }
                </TableContainer>
                {!isLoading ? <PaginationTable /> : <Skeleton variant="rectangular" />}
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
            >
                <EditActivityForm
                    getActivitiesAPI={getActivitiesAPI}
                    setOpenPopup={setOpenEditActivityPopup}
                    editedGroup={editedGroup}
                />
            </EditActivityPopup>
        </>
    );
}
export default Activities;