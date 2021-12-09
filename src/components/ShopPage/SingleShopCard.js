import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, Grid } from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Auth from '../../api/Auth';
import SvgConverter from './SvgConverter';

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
        justifyContent: "space-between"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));

function render_xml(id, xml_string) {
    var doc = new DOMParser().parseFromString(xml_string, 'application/xml');
    var el = document.getElementById(id)
    el.appendChild(
        el.ownerDocument.importNode(doc.documentElement, true),
    )
}

const SingleShopCard = ({ source, itemName, category, shopItemId, getShopAPI, cost, image }) => {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={itemName}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {itemName}
                            </Typography>
                            <Typography gutterBottom variant="h7" component="h4">
                                {category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Koszt: {cost} pkt.
                            </Typography>
                        </CardContent>
                        {JSON.parse(Auth.getRole()) === "ADMIN" ? <CardActions className={classes.cardActions}>
                        </CardActions> : null}
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    );
}

export default SingleShopCard;


