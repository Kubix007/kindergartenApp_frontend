import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../api/Repository';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {
    Container,
    Paper,
} from '@material-ui/core';
import HistoryPointsTableAdmin from '../components/HistoryPoints/HistoryPointsTableAdmin';

const resourceHistoryPointsAPI = 'points_histories';


const useStyles = makeStyles((theme) => ({
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    button: {
        paddingBottom: theme.spacing(3),

    }
}));

const HistoryPointsAdmin = () => {
    const classes = useStyles();
    const [pointsHistories, setPointsHistories] = useState([]);
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);

    const getPointsHistoriesAPI = () => {
        Repository.getAll(resourceHistoryPointsAPI).then(
            (data) => {
                setPointsHistories(data.data);
                setUpdatingStatusPopup(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getPointsHistoriesAPI();
    }, []);

    return (
        <>
            <PageHeader
                title="Historia punktów"
                subTitle="Tutaj przejrzysz historię punktów"
                icon={<SportsScoreOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" >
                <Paper elevation={6} className={classes.pageContent}>
                    {!updatingStatusPopup && pointsHistories.length === 0 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h2>Brak istniejącej historii</h2></div> : null}
                    {!updatingStatusPopup && pointsHistories.length > 0 ? <HistoryPointsTableAdmin data={pointsHistories} /> : null}
                </Paper>
            </Container>
            <UpdatingStatusPopup
                openPopup={updatingStatusPopup}
                setOpenPopup={setUpdatingStatusPopup}
                isTitle={false}
            >
                <UpdatingStatusForm
                    setOpenPopup={updatingStatusPopup}
                />
            </UpdatingStatusPopup>
        </>
    );
}

export default HistoryPointsAdmin;