import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PageHeader from '../components/PageHeader';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import {
    Paper,
    Grid,
} from '@material-ui/core';
import Repository from '../api/Repository';
import EditUserPopup from '../components/Popups/Popup';
import EditUserForm from '../components/Forms/EditUserForm';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';
import DeleteUserPopup from '../components/Popups/Popup';
import DeleteUserForm from '../components/Forms/DeleteUserForm';
import ButtonUsersTable from '../components/AdminDashboard/ButtonUsersTable';
import ButtonEmployeesTable from '../components/AdminDashboard/ButtonEmployeesTable';
import UsersTable from '../components/AdminDashboard/UsersTable';
import EmployeesTable from '../components/AdminDashboard/EmployeesTable';
import DeleteEmployeePopup from '../components/Popups/Popup';
import DeleteEmployeeForm from '../components/Forms/DeleteEmployeeForm';
import EditEmployeePopup from '../components/Popups/Popup';
import EditEmployeeForm from '../components/Forms/EditEmployeeForm';
import AddEmployeePopup from '../components/Popups/Popup';
import AddEmployeeForm from '../components/Forms/AddEmployeeForm';
import ButtonAddEmployee from '../components/AdminDashboard/ButtonAddEmployee';

const resourceUserDetailsAPI = 'user_details';
const resourceEmployeesAPI = 'employees';


const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    gridButtons: {
        margin: theme.spacing(5),
    },
    table: {
        marginTop: theme.spacing(3),
        display: 'table',
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary,
            backgroundColor: theme.palette.grey[50],
            boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .1)',
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.grey[50],
            cursor: 'pointer',
        },
    },
}));

const AdminDashboard = () => {
    const classes = useStyles();
    const [userDetails, setUserDetails] = useState();
    const [employees, setEmployees] = useState();
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
    const [isUsersSelected, setIsUsersSelected] = useState(true);
    const [openEditUserPopup, setOpenEditUserPopup] = useState(false);
    const [editedUser, setEditedUser] = useState();
    const [editedEmployee, setEditedEmployee] = useState();
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(false);
    const [openDeleteUserPopup, setOpenDeleteUserPopup] = useState(false);
    const [openEditEmployeePopup, setOpenEditEmployeePopup] = useState(false);
    const [openDeleteEmployeePopup, setOpenDeleteEmployeePopup] = useState(false);
    const [openAddEmployeePopup, setOpenAddEmployeePopup] = useState(false);

    const getUserDetailsAPI = () => {
        Repository.getAll(resourceUserDetailsAPI).then(
            (data) => {
                setUserDetails(data.data);
                setIsLoadingUsers(false);
                setUpdatingStatusPopup(false);
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
                setIsLoadingEmployees(false);
                setUpdatingStatusPopup(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <>
            <PageHeader
                title="Panel administratora"
                subTitle="Zarządzaj użytkownikami"
                icon={<AdminPanelSettingsOutlinedIcon fontSize="large" />}
            />
            <Grid container className={classes.gridButtons} spacing={1} >
                <Grid item><ButtonUsersTable disabled={isUsersSelected} setIsUsersSelected={setIsUsersSelected} /></Grid>
                <Grid item><ButtonEmployeesTable disabled={!isUsersSelected} setIsUsersSelected={setIsUsersSelected} /></Grid>
            </Grid>
            <Grid container className={classes.gridButtons} spacing={1} >
                <Grid item><ButtonAddEmployee setOpenPopup={setOpenAddEmployeePopup} /></Grid>
            </Grid>
            <Paper elevation={6} className={classes.pageContent}>
                {isUsersSelected ? <UsersTable
                    isLoading={isLoadingUsers}
                    userDetails={userDetails}
                    setOpenEditUserPopup={setOpenEditUserPopup}
                    setOpenDeleteUserPopup={setOpenDeleteUserPopup}
                    setEditedUser={setEditedUser}
                    getUserDetailsAPI={getUserDetailsAPI}
                    setOpenSetAsEmployeePopup={setOpenAddEmployeePopup}
                    setIsLoading={setIsLoadingUsers}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                /> : <EmployeesTable
                    isLoading={isLoadingEmployees}
                    employees={employees}
                    setOpenEditEmployeePopup={setOpenEditEmployeePopup}
                    setOpenDeleteEmployeePopup={setOpenDeleteEmployeePopup}
                    setEditedEmployee={setEditedEmployee}
                    getEmployeesAPI={getEmployeesAPI}
                    setIsLoading={setIsLoadingEmployees}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}

                />}
            </Paper>
            <EditUserPopup
                openPopup={openEditUserPopup}
                setOpenPopup={setOpenEditUserPopup}
                title="Edytuj użytkownika"
                maxWidth="sm"
            >
                <EditUserForm
                    setOpenPopup={setOpenEditUserPopup}
                    getUserDetailsAPI={getUserDetailsAPI}
                    editedUser={editedUser}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </EditUserPopup>
            <UpdatingStatusPopup
                openPopup={updatingStatusPopup}
                setOpenPopup={setUpdatingStatusPopup}
                isTitle={false}
            >
                <UpdatingStatusForm
                    setOpenPopup={updatingStatusPopup}
                />
            </UpdatingStatusPopup>
            <DeleteUserPopup
                openPopup={openDeleteUserPopup}
                setOpenPopup={setOpenDeleteUserPopup}
                title="Usuń użytkownika"
                maxWidth="sm"
            >
                <DeleteUserForm
                    setOpenPopup={setOpenDeleteUserPopup}
                    getUserDetailsAPI={getUserDetailsAPI}
                    editedUser={editedUser}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </DeleteUserPopup>
            <DeleteEmployeePopup
                openPopup={openDeleteEmployeePopup}
                setOpenPopup={setOpenDeleteEmployeePopup}
                title="Usuń pracownika"
                maxWidth="sm"
            >
                <DeleteEmployeeForm
                    setOpenPopup={setOpenDeleteEmployeePopup}
                    getEmployeesAPI={getEmployeesAPI}
                    editedEmployee={editedEmployee}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </DeleteEmployeePopup>
            <EditEmployeePopup
                openPopup={openEditEmployeePopup}
                setOpenPopup={setOpenEditEmployeePopup}
                title="Edytuj pracownika"
                maxWidth="sm"
            >
                <EditEmployeeForm
                    setOpenPopup={setOpenEditEmployeePopup}
                    getEmployeesAPI={getEmployeesAPI}
                    editedEmployee={editedEmployee}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </EditEmployeePopup>
            <AddEmployeePopup
                openPopup={openAddEmployeePopup}
                setOpenPopup={setOpenAddEmployeePopup}
                title="Dodaj jako pracownika"
                maxWidth="sm"
            >
                <AddEmployeeForm
                    setOpenPopup={setOpenAddEmployeePopup}
                    getUserDetailsAPI={getUserDetailsAPI}
                    userDetails={userDetails}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </AddEmployeePopup>
        </>
    );
}

export default AdminDashboard;