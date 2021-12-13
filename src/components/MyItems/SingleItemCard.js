import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, Grid } from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonColoringBook from './ButtonColoringBook';

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "center"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));

const SingleItemCard = ({ item }) => {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={item.image}
                            title={item.item_name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.item_name}
                            </Typography>
                            <Typography gutterBottom variant="h7" component="h4">
                                {item.category}
                            </Typography>
                        </CardContent>
                        {item.category === "Kolorowanka" ? <CardActions className={classes.cardActions}>
                            <ButtonColoringBook item={item} />
                        </CardActions> : null}
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    );
}

export default SingleItemCard;


