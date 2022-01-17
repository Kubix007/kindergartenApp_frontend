import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, Grid } from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Auth from '../../api/Auth';
import ButtonBuyClothes from './ButtonBuyClothes';

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240,
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


const SingleShopClothesCard = ({ userPoints, userDetailsId, item, setBuyingStatusPopup, getUserDetailsAPI }) => {
    const classes = useStyles();
    const [openBuyItemPopup, setOpenBuyItemPopup] = useState(false);

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={item.image}
                            title={item.item_name}
                            style={{ backgroundSize: "auto" }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography gutterBottom variant="h7" component="h4">
                                {item.category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Koszt: {item.cost} pkt.
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                            <ButtonBuyClothes getUserDetailsAPI={getUserDetailsAPI} setBuyingStatusPopup={setBuyingStatusPopup} item={item} userPoints={userPoints} userDetailsId={userDetailsId} openPopup={openBuyItemPopup} setOpenPopup={setOpenBuyItemPopup} />
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    );
}

export default SingleShopClothesCard;


