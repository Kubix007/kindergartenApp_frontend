import React from 'react'
import './HistoryPointsTableAdmin.css';

const headCells = [
    { id: 'first_name', label: 'Imię:' },
    { id: 'surname', label: 'Nazwisko:' },
    { id: 'description', label: 'Opis:' },
    { id: 'points', label: 'Punkty:' },
    { id: 'created_at', label: 'Data:' },
]
const HistoryPointsTableAdmin = ({ data }) => {

    return (
        <table class="adminPointsHistory">
            <caption class="adminPointsHistory">HISTORIA PUNKTÓW</caption>
            <thead class="adminPointsHistory">
                <tr class="adminPointsHistory">
                    {data.length > 0 ? headCells.map(headCell => (
                        <th scope="col" key={headCell.id}>{headCell.label}</th>
                    )) : null}
                </tr>
            </thead>
            <tbody>
                {data.map((history) => (
                    <tr class="adminPointsHistory">
                        <td class="adminPointsHistory" data-label="Imię:">{history.user_details.first_name}</td>
                        <td class="adminPointsHistory" data-label="Nazwisko:">{history.user_details.surname}</td>
                        <td class="adminPointsHistory" data-label="Opis:">{history.description}</td>
                        <td class="adminPointsHistory" data-label="Punkty:">{history.points}</td>
                        <td class="adminPointsHistory" data-label="Data:">{typeof history.created_at === "undefined" ? " " : (history.created_at.toString()).slice(0, 10)}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
}

export default HistoryPointsTableAdmin;