import React from 'react'
import { TableCell, TableBody, TableRow } from '@material-ui/core';
import { Skeleton } from '@mui/material';


const LoadingTableParticipants = () => {
    return (
        <TableBody>
            <TableRow>
                <TableCell><Skeleton variant="rectangular" /></TableCell>
                <TableCell><Skeleton variant="rectangular" /></TableCell>
                <TableCell><Skeleton variant="rectangular" /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell><Skeleton variant="rectangular" /></TableCell>
                <TableCell><Skeleton variant="rectangular" /></TableCell>
                <TableCell><Skeleton variant="rectangular" /></TableCell>

            </TableRow>
            <TableRow>
                <TableCell><Skeleton variant="rectangular" /></TableCell>
                <TableCell><Skeleton variant="rectangular" /></TableCell>
                <TableCell><Skeleton variant="rectangular" /></TableCell>

            </TableRow>
        </TableBody>
    );
}

export default LoadingTableParticipants;