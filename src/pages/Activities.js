import React, { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, Toolbar, TextField, InputAdornment } from '@material-ui/core';
import PageHeader from '../components/PageHeader';
import useTable from '../components/Tables/useTable';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Repository from '../api/Repository';
import LoadingTable from '../components/Tables/LoadingTable';
import { Skeleton } from '@mui/material';
import { Search } from '@material-ui/icons';


const resourceAPI = 'activities';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
}))

const headCells = [
    { id: 'name', label: 'Nazwa zajęć:' },
    { id: 'leader', label: 'Prowadzący:' },
    { id: 'participantCount', label: 'Liczba uczestników:' }
]

const Activities = () => {

    const classes = useStyles();
    const [activities, setActivities] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({ filter: items => { return items; } });
    const {
        TableContainer,
        HeadTable,
        PaginationTable,
        activitiesAfterPagingAndSorting,
    } = useTable(activities, headCells, filter);

    const getActivitiesAPI = () => {
        setIsLoading(true);
        Repository.getAll(resourceAPI).then(
            (data) => {
                setTimeout(() => {
                    setActivities(data.data);
                    setIsLoading(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getEmployees = () => {

    }

    const handleSearch = (e) => {
        let target = e.target;
        setFilter({
            filter: items => {
                if (target.value === "") {
                    return items;
                }
                else {
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
                }
            }
        })

    }

    useEffect(() => {
        getActivitiesAPI();
    }, []);

    return (
        <>
            <PageHeader
                title="Zajęcia"
                subTitle="Dodatkowe grupy zajęciowe"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper elevation={6} className={classes.pageContent}>
                <Toolbar>
                    <TextField variant="outlined" label="Wyszukaj nazwę grupy"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TableContainer >
                    <HeadTable />
                    {!isLoading
                        ? (<TableBody>
                            {
                                activitiesAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.leader}</TableCell>
                                    <TableCell>{item.participantCount}/10</TableCell>
                                </TableRow>)
                                )
                            }
                        </TableBody>)
                        : <LoadingTable />
                    }
                </TableContainer>
                {!isLoading ? <PaginationTable /> : <Skeleton variant="rectangular" />}
            </Paper>
        </>
    );
}
export default Activities;