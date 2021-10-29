import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SingleCard from '../components/NewsPage/SingleCard';
import {
    Container,
    Grid,
    Typography,
} from '@material-ui/core';

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
    }
}));

const News = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.blogsContainer}>
            <Typography variant="h1" className={classes.blogTitle}>
                Aktualności
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <SingleCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SingleCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SingleCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SingleCard />
                </Grid>
            </Grid>
        </Container>
    );
}

export default News;