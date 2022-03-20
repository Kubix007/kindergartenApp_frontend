import React from 'react'
import './HistoryPointsTable.css';

const headCells = [
    { id: 'description', label: 'Opis:' },
    { id: 'points', label: 'Punkty:' },
    { id: 'created_at', label: 'Data:' },
]
const HistoryPointsTable = ({ data }) => {
    return (
        <table class="userPointsHistory">
            <caption class="userPointsHistory">HISTORIA PUNKTÓW</caption>
            <thead class="userPointsHistory">
                <tr class="userPointsHistory">
                    {data.length > 0 ? headCells.map(headCell => (
                        <th scope="col" key={headCell.id}>{headCell.label}</th>
                    )) : null}
                </tr>
            </thead>
            <tbody>
                {data.map((history) => (
                    <tr class="userPointsHistory">
                        <td class="userPointsHistory" data-label="Opis:">{history.description}</td>
                        <td class="userPointsHistory" data-label="Punkty:">{history.points}</td>
                        <td class="userPointsHistory" data-label="Data:">{typeof history.created_at === "undefined" ? " " : (history.created_at.toString()).slice(0, 10)}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
}

export default HistoryPointsTable;