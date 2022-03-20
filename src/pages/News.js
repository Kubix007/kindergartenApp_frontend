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
import { toast } from 'react-toastify';


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
    const [news, setNews] = useState([]);
    const getNewsAPI = () => {
        setUpdatingStatusPopup(true);
        Repository.getAll(resourceAPI).then(
            (data) => {
                setNews(data.data);
                getUser();
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować ogłoszeń`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        )
    }

    const refreshNewsAfterAdd = () => {
        Repository.getAll(resourceAPI).then(
            (data) => {
                setNews(data.data);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie dodano ogłoszenie`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulNewsToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się dodać ogłoszenia`, {
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

    const refreshNewsAfterEdit = () => {
        Repository.getAll(resourceAPI).then(
            (data) => {
                setNews(data.data);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie zmieniono ogłoszenie`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulNewsToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się zmienić ogłoszenia`, {
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

    const refreshNewsAfterDelete = () => {
        Repository.getAll(resourceAPI).then(
            (data) => {
                setNews(data.data);
                setUpdatingStatusPopup(false);
                toast.success(`Pomyślnie usunięto ogłoszenie`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulNewsToast"

                });
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się usunąć ogłoszenia`, {
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

    const getUser = () => {
        Auth.getUser().then(
            (data) => {
                try {
                    getUserDetails(data.data.id);
                    setUpdatingStatusPopup(false);

                } catch (error) {
                    Auth.reset();
                    toast.error(`Nie udało się załadować ogłoszeń`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            },
            (error) => {
                console.log(error);
                toast.error(`Nie udało się załadować ogłoszeń`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        )
    }

    const getUserDetails = (id) => {
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
        getNewsAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Button disabled={userDetailsId && !updatingStatusPopup? false : true} id="addNewsButton" variant="contained" color="primary" startIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setOpenPopup(true)}>Dodaj ogłoszenie</Button>
                </Typography> : null}
                {!updatingStatusPopup && news.length === 0 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h1>Brak ogłoszeń</h1></div> : null}
                <Grid container spacing={3}>
                    {!updatingStatusPopup && news ? <SingleCardList refreshNewsAfterEdit={refreshNewsAfterEdit} setUpdatingStatusPopup={setUpdatingStatusPopup} refreshNewsAfterDelete={refreshNewsAfterDelete} singleNews={news} getNewsAPI={getNewsAPI} setOpenPopup={setOpenPopup}
                    /> : null}
                </Grid>
            </Container>
            <AddPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Dodaj nowe ogłoszenie"
            >
                <AddNewsForm
                    getNewsAPI={refreshNewsAfterAdd}
                    setOpenPopup={setOpenPopup}
                    userDetailsId={userDetailsId}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
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