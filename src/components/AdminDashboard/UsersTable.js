import React, { useEffect } from 'react'
import ButtonEditUser from '../AdminDashboard/ButtonEditUser';
import ButtonDeleteUser from '../AdminDashboard/ButtonDeleteUser';
import Auth from '../../api/Auth';
import LoadingTableUsers from '../Tables/LoadingTableUsers';
import './UsersDashboardTables.css';

const headCells = [
    { id: 'first_name', label: 'Imię:' },
    { id: 'surname', label: 'Nazwisko:' },
    { id: 'parents_first_name', label: 'Imię rodzica:' },
    { id: 'parents_surname', label: 'Nazwisko rodzica:' },
    { id: 'parents_phone', label: 'Telefon rodzica:' },
    { id: 'town', label: 'Miasto:' },
    { id: 'street', label: 'Ulica:' },
    { id: 'points', label: 'Punkty:' },
    { id: 'actions', label: '' },
    { id: 'actions', label: '' }

]

const UsersTable = ({ isLoading, userDetails, setUpdatingStatusPopup, setOpenEditUserPopup, setOpenDeleteUserPopup, setEditedUser, setIsLoading, getUserDetailsAPI }) => {

    useEffect(() => {
        setIsLoading(true);
        setUpdatingStatusPopup(true);
        getUserDetailsAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        < table class="usersDashboard" >
            <caption class="usersDashboard" >UŻYTKOWNICY</caption>
            <thead class="usersDashboard">
                <tr>
                    {headCells.map(headCell => (
                        <th scope="col" key={headCell.id}>{headCell.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {!isLoading ? userDetails.filter((row) => row.user.role === "USER" || row.user.role === "ADMIN" ).map((row) => (
                    <tr class="usersDashboard"
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <td class="usersDashboard" data-label="Imię" component="th">{row.first_name ? row.first_name : "Brak imienia"}</td>
                        <td class="usersDashboard" data-label="Nazwisko">{row.surname ? row.surname : "Brak nazwiska"}</td>
                        <td class="usersDashboard" data-label="Imię rodzica">{row.parents_first_name ? row.parents_first_name : "-"}</td>
                        <td class="usersDashboard" data-label="Nazwisko rodzica">{row.parents_surname ? row.parents_surname : "-"}</td>
                        <td class="usersDashboard" data-label="Telefon">{row.parents_phone ? row.parents_phone : "Brak telefonu"}</td>
                        <td class="usersDashboard" data-label="Miasto">{row.town ? row.town : "Brak miasta"}</td>
                        <td class="usersDashboard" data-label="Ulica">{row.street ? row.street : "Brak ulicy"}</td>
                        <td class="usersDashboard" data-label="Punkty">{row.points}</td>
                        <td class="usersDashboard" id="userActionsWindow">{JSON.parse(Auth.getRole()) === "ADMIN" ?
                            <ButtonEditUser user={row} setOpenPopup={setOpenEditUserPopup} setEditedUser={setEditedUser} />
                            : null}
                        </td>
                        <td class="usersDashboard" id="userActionsWindow">{JSON.parse(Auth.getRole()) === "ADMIN" ?
                            <ButtonDeleteUser user={row} setOpenPopup={setOpenDeleteUserPopup} setEditedUser={setEditedUser} />
                            : null}
                        </td>
                    </tr>
                )) : <LoadingTableUsers />}
            </tbody>
        </table >
    );
}

export default UsersTable;