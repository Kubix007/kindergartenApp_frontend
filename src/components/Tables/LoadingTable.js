import React from 'react'
import { Skeleton } from '@mui/material';


const LoadingTable = () => {
    return (
        <>
            <tr>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
                <td><Skeleton variant="rectangular" /></td>
            </tr>
        </>
    );
}

export default LoadingTable;