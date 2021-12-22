import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
    Box,
} from '@material-ui/core';
import ButtonEditUser from '../AdminDashboard/ButtonEditUser';
import ButtonDeleteUser from '../AdminDashboard/ButtonDeleteUser';
import Auth from '../../api/Auth';
import LoadingTableUsers from '../Tables/LoadingTableUsers';
import { makeStyles } from '@material-ui/core/styles';

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
    { id: 'login', label: 'Login:', isAdmin: false, },
    { id: 'childs_first_name', label: 'Imię:', isAdmin: false, },
    { id: 'childs_surname', label: 'Nazwisko:', isAdmin: false, },
    { id: 'parents_first_name', label: 'Imię rodzica:', isAdmin: false, },
    { id: 'parents_surname', label: 'Nazwisko rodzica:', isAdmin: false, },
    { id: 'parents_phone', label: 'Telefon rodzica:', isAdmin: false, },
    { id: 'town', label: 'Miasto:', isAdmin: false, },
    { id: 'points', label: 'Punkty:', isAdmin: false, },
    { id: 'actions', label: 'Akcje:', isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" ? false : true }
]

const UsersTable = ({ isLoading, userDetails, setUpdatingStatusPopup, setOpenEditUserPopup, setOpenDeleteUserPopup, setEditedUser, setIsLoading, getUserDetailsAPI }) => {
    const classes = useStyles();

    useEffect(() => {
        setIsLoading(true);
        setUpdatingStatusPopup(true);
        getUserDetailsAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableContainer>
            <Table className={classes.table} sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headCells.filter(headCell => headCell.isAdmin === false).map(headCell => (
                            <TableCell key={headCell.id}>{headCell.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {!isLoading ? <TableBody>
                    {userDetails.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell >{row.user.login}</TableCell>
                            <TableCell component="th" scope="row">{row.childs_first_name ? row.childs_first_name : "Brak imienia"}</TableCell>
                            <TableCell >{row.childs_surname ? row.childs_surname : "Brak nazwiska"}</TableCell>
                            <TableCell >{row.parents_first_name ? row.parents_first_name : "Brak imienia rodziców"}</TableCell>
                            <TableCell >{row.parents_surname ? row.parents_surname : "Brak nazwiska rodziców"}</TableCell>
                            <TableCell >{row.parents_phone ? row.parents_phone : "Brak telefonu"}</TableCell>
                            <TableCell >{row.town ? row.town : "Brak miasta"}</TableCell>
                            <TableCell >{row.points}</TableCell>
                            <TableCell >{JSON.parse(Auth.getRole()) === "ADMIN" ?
                                <Box justifyContent="space-between" display="flex">
                                    <ButtonEditUser user={row} setOpenPopup={setOpenEditUserPopup} setEditedUser={setEditedUser} />
                                    <ButtonDeleteUser user={row} setOpenPopup={setOpenDeleteUserPopup} setEditedUser={setEditedUser} />
                                </Box > : null}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <LoadingTableUsers />}
            </Table>
        </TableContainer>
    );
}

export default UsersTable;