import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../api/Auth';
import Repository from '../api/Repository';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import {
    Container,
    Paper,
} from '@material-ui/core';
import HistoryPointsTable from '../components/HistoryPoints/HistoryPointsTable';
import { toast } from 'react-toastify';

const resourceUserDetailsAPI = 'user_details';
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

const HistoryPoints = () => {
    const classes = useStyles();
    const [pointsHistories, setPointsHistories] = useState([]);
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);

    const getUser = () => {
        Auth.getUser().then(
            (data) => {
                try {
                    getUserDetails(data.data.id);
                } catch (error) {
                    Auth.reset();
                }
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getPointsHistoriesAPI = (userId) => {
        Repository.getById(resourceHistoryPointsAPI, userId).then(
            (data) => {
                setPointsHistories(data.data);
                setUpdatingStatusPopup(false);
            },
            () => {
                toast.error(`Nie udało się pobrać historii punktów`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);
            }
        )
    }

    const getUserDetails = (id) => {
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                getPointsHistoriesAPI(data.data.data.user_id);
            },
            () => {
                toast.error(`Nie udało się pobrać historii punktów`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setUpdatingStatusPopup(false);
            }
        )
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {!updatingStatusPopup && pointsHistories.length > 0 ? <HistoryPointsTable data={pointsHistories} /> : null}
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

export default HistoryPoints;