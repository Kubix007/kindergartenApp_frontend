import React, { useEffect } from 'react'
import Auth from '../../api/Auth';
import LoadingTableEmployees from '../Tables/LoadingTableEmployees';
import ButtonDeleteEmployee from './ButtonDeleteEmployee';
import ButtonEditEmployee from './ButtonEditEmployee';
import './EmployeesDashboardTables.css';

const headCells = [
    { id: 'first_name', label: 'Imię:', isAdmin: false, },
    { id: 'surname', label: 'Nazwisko:', isAdmin: false, },
    { id: 'position_name', label: 'Stanowisko:', isAdmin: false, },
    { id: 'activities', label: 'Prowadzi zajęcia:', isAdmin: false, },
    { id: 'phone', label: 'Telefon:', isAdmin: false, },
    { id: 'email', label: 'Email:', isAdmin: false, },
    { id: 'actions', label: '', isAdmin: false },
    { id: 'actions', label: '', isAdmin: false }

]

const EmployeesTable = ({ isLoading, employees, setOpenEditEmployeePopup, setUpdatingStatusPopup, setOpenDeleteEmployeePopup, getEmployeesAPI, setEditedEmployee, setIsLoading }) => {

    useEffect(() => {
        setIsLoading(true);
        setUpdatingStatusPopup(true);
        getEmployeesAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        < table class="employeesDashboard" >
            <caption class="employeesDashboard" >NAUCZYCIELE</caption>
            <thead class="employeesDashboard">
                <tr>
                    {headCells.map(headCell => (
                        <th scope="col" key={headCell.id}>{headCell.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {!isLoading ? employees.map((row) => (
                    <tr class="employeesDashboard"
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <td class="employeesDashboard" data-label="Imię">{row.first_name}</td>
                        <td class="employeesDashboard" data-label="Nazwisko">{row.surname}</td>
                        <td class="employeesDashboard" data-label="Stanowisko">{row.position_name}</td>
                        <td class="employeesDashboard" data-label="Prowadzi zajęcia">{row.activities.map(activity => activity.name).join(", ")}</td>
                        <td class="employeesDashboard" data-label="Telefon">{row.phone}</td>
                        <td class="employeesDashboard" id="emailEmployeeTd" data-label="Email">{row.user.email}</td>
                        <td class="employeesDashboard" id="employeesActionsWindow">{JSON.parse(Auth.getRole()) === "ADMIN" ?
                            <ButtonEditEmployee employee={row} setOpenPopup={setOpenEditEmployeePopup} setEditedEmployee={setEditedEmployee} />
                            : null}
                        </td>
                        <td class="employeesDashboard" id="employeesActionsWindow">{JSON.parse(Auth.getRole()) === "ADMIN" ?
                            <ButtonDeleteEmployee employee={row} setOpenPopup={setOpenDeleteEmployeePopup} setEditedEmployee={setEditedEmployee} />
                            : null}
                        </td>
                    </tr>
                )) : <LoadingTableEmployees />}
            </tbody>
        </table >
    );
}

export default EmployeesTable;