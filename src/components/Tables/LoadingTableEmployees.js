import React from 'react'
import { Skeleton } from '@mui/material';


const LoadingTableEmployees = () => {
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
            </tr>
        </>
    );
}

export default LoadingTableEmployees;