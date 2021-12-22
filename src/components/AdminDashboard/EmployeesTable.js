import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Auth from '../../api/Auth';
import LoadingTableUsers from '../Tables/LoadingTableUsers';
import { makeStyles } from '@material-ui/core/styles';
import ButtonDeleteEmployee from './ButtonDeleteEmployee';
import ButtonEditEmployee from './ButtonEditEmployee';
import {
    Box,
} from '@material-ui/core';

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
}));

const headCells = [
    { id: 'user_id', label: 'ID:', isAdmin: false, },
    { id: 'first_name', label: 'Imię:', isAdmin: false, },
    { id: 'surname', label: 'Nazwisko:', isAdmin: false, },
    { id: 'position_name', label: 'Stanowisko:', isAdmin: false, },
    { id: 'phone', label: 'Telefon:', isAdmin: false, },
    { id: 'town', label: 'Miasto:', isAdmin: false, },
    { id: 'email', label: 'Email:', isAdmin: false, },
    { id: 'actions', label: 'Akcje:', isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" ? false : true }
]

const EmployeesTable = ({ isLoading, employees, setOpenEditEmployeePopup, setUpdatingStatusPopup, setOpenDeleteEmployeePopup, getEmployeesAPI, setEditedEmployee, setIsLoading }) => {
    const classes = useStyles();

    useEffect(() => {
        setIsLoading(true);
        setUpdatingStatusPopup(true);
        getEmployeesAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableContainer>
            <Table className={classes.table} sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {headCells.filter(headCell => headCell.isAdmin === false).map(headCell => (
                            <TableCell key={headCell.id}>{headCell.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {!isLoading ? <TableBody>
                    {employees.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.user_id}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.surname}</TableCell>
                            <TableCell>{row.position_name}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.town}</TableCell>
                            <TableCell>{row.user.email}</TableCell>
                            {JSON.parse(Auth.getRole()) === "ADMIN" ? <TableCell >
                                <Box justifyContent="space-between" display="flex">
                                    <ButtonEditEmployee employee={row} setOpenPopup={setOpenEditEmployeePopup} setEditedEmployee={setEditedEmployee} />
                                    <ButtonDeleteEmployee employee={row} setOpenPopup={setOpenDeleteEmployeePopup} setEditedEmployee={setEditedEmployee} />
                                </Box >
                            </TableCell> : null}
                        </TableRow>
                    ))}
                </TableBody> : <LoadingTableUsers />}
            </Table>
        </TableContainer>
    );
}

export default EmployeesTable;