import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Repository from '../api/Repository';
import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';
import SingleCardList from '../components/NewsPage/SingleCardList';
import Button from '@mui/material/Button';
import { Skeleton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddPopup from '../components/NewsPage/Popup';
import AddNewsForm from '../components/Forms/AddNewsForm';
import Auth from '../api/Auth';

const resourceAPI = 'news';

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

    const [news, setNews] = useState();
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

    useEffect(() => {
        getNewsAPI();
    }, []);

    return (
        <>
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Typography variant="h4" className={classes.blogTitle}>
                    Aktualności
                </Typography>
                {JSON.parse(Auth.getRole()) === "ADMIN" ? <Typography className={classes.button}>
                    <Button variant="contained" color="success" startIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setOpenPopup(true)}>Dodaj aktualność</Button>
                </Typography> : null}

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
                />
            </AddPopup>
        </>
    );
}

export default News;