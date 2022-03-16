import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../api/Repository';
import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import SingleCardList from '../components/NewsPage/SingleCardList';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import AddPopup from '../components/Popups/Popup';
import AddNewsForm from '../components/Forms/AddNewsForm';
import Auth from '../api/Auth';
import PageHeader from '../components/PageHeader';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';


const resourceAPI = 'news';
const resourceUserDetailsAPI = 'user_details';

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

const News = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [userDetailsId, setUserDetailsId] = useState();
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);
    const [news, setNews] = useState([0]);
    const getNewsAPI = () => {
        Repository.getAll(resourceAPI).then(
            (data) => {
                setTimeout(() => {
                    setNews(data.data);
                    setUpdatingStatusPopup(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getUserDetails = () => {
        let id = parseInt(Auth.getUserId());
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                setUserDetailsId(data.data.data.id);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getUserDetails();
        getNewsAPI();
    }, []);

    return (
        <>
            <PageHeader
                title="Aktualności"
                subTitle="Bieżące wiadomości"
                icon={<AnnouncementOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>
                {JSON.parse(Auth.getRole()) === "ADMIN" ? <Typography className={classes.button}>
                    <Button id="addNewsButton" variant="contained" color="primary" startIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setOpenPopup(true)}>Dodaj ogłoszenie</Button>
                </Typography> : null}
                {news.length === 0 && !updatingStatusPopup ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h1>Brak aktualności</h1></div> : null}
                <Grid container spacing={3}>
                    {!updatingStatusPopup ? <SingleCardList singleNews={news} getNewsAPI={getNewsAPI} setOpenPopup={setOpenPopup}
                    /> : null}
                </Grid>
            </Container>
            <AddPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Dodaj nowe ogłoszenie"
            >
                <AddNewsForm
                    getNewsAPI={getNewsAPI}
                    setOpenPopup={setOpenPopup}
                    userDetailsId={userDetailsId}
                />
            </AddPopup>
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

export default News;