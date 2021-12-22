import React, { useState } from 'react'
import { Table, TableCell, TableHead, TableRow, makeStyles, TablePagination, TableSortLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        tableLayout: 'fixed',
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary,
            backgroundColor: theme.palette.grey[50],
            boxShadow: '0 2px 2px 2px rgba(0, 0, 0, .1)',
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.grey[50],
            cursor: 'pointer',
        },
    },
}))

const useTable = (records, headCells, filter) => {

    const classes = useStyles();

    const pages = [5, 10, 25]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TableContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);

    }

    const TableSort = (array, comparator) => {
        const tableSort = array.map((element, index) => [element, index]);
        tableSort.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return tableSort.map((element) => element[0]);
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }

    const activitiesAfterPagingAndSorting = () => {
        return TableSort(filter.filter(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    const PaginationTable = () => (
        <TablePagination
            rowsPerPageOptions={pages}
            labelRowsPerPage="Liczba rekordów na stronie"
            rowsPerPage={rowsPerPage}
            page={page}
            component="div"
            count={records.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        >
        </TablePagination>
    )

    const HeadTable = props => {

        const handleSortRequest = (cellId) => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }

        return (
            <TableHead >
                <TableRow >
                    {
                        headCells.map(headCell => (
                            <TableCell
                                key={headCell.id}
                                sortDirection={orderBy === headCell.id ? order : false}>
                                {headCell.disableSorting ? headCell.label : (
                                    <TableSortLabel
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={() => { handleSortRequest(headCell.id) }}
                                        active={orderBy === headCell.id}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                )}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    return {
        TableContainer,
        HeadTable,
        PaginationTable,
        activitiesAfterPagingAndSorting,
    }
}

export default useTable;