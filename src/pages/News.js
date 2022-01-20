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
import { Skeleton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import AddPopup from '../components/Popups/Popup';
import AddNewsForm from '../components/Forms/AddNewsForm';
import Auth from '../api/Auth';
import PageHeader from '../components/PageHeader';


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
    const [isLoading, setIsLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [userDetailsId, setUserDetailsId] = useState();

    const [news, setNews] = useState([0]);
    const getNewsAPI = () => {
        setIsLoading(true);
        Repository.getAll(resourceAPI).then(
            (data) => {
                setTimeout(() => {
                    setNews(data.data);
                    setIsLoading(false);
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
                    <Button variant="contained" color="primary" startIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setOpenPopup(true)}>Dodaj aktualność</Button>
                </Typography> : null}
                {news.length === 0 && !isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h1>Brak aktualności</h1></div> : null}
                <Grid container spacing={3}>
                    {!isLoading ? <SingleCardList singleNews={news} getNewsAPI={getNewsAPI} setOpenPopup={setOpenPopup}
                    /> :
                        (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rectangular" width={390} height={240} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rectangular" width={390} height={240} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Skeleton variant="rectangular" width={390} height={240} />
                                </Grid>
                            </Grid>
                        )}
                </Grid>
            </Container>
            <AddPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Dodaj nową aktualność"
            >
                <AddNewsForm
                    getNewsAPI={getNewsAPI}
                    setOpenPopup={setOpenPopup}
                    userDetailsId={userDetailsId}
                />
            </AddPopup>
        </>
    );
}

export default News;