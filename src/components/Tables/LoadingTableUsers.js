import React from 'react'
import { Skeleton } from '@mui/material';


const LoadingTableParticipants = () => {
    return (
        <>
            <tr>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
            </tr>
        </>
    );
}

export default LoadingTableParticipants;