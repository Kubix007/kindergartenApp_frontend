import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, Grid } from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonSetCloth from './ButtonSetCloth';
import ButtonRemoveCloth from './ButtonRemoveCloth';

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

const SingleClothCard = ({ cloth, isBlouse, isPants, isHat, setIsBlouse, setIsHat, setIsPants }) => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [isEquipped, setIsEquipped] = useState(cloth.isEquipped);

    return (
        <Grid item style={{ padding: "5px" }}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={cloth.image}
                        title={cloth.name}
                        style={{ backgroundSize: "contain" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {cloth.name}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="h4">
                            {cloth.category}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        {cloth.category === "Czapka" ?
                            <>
                                <ButtonSetCloth clothes={cloth} isEquipped={isEquipped} otherItems={isHat} setOtherItems={setIsHat} setIsEquipped={setIsEquipped} />
                                <ButtonRemoveCloth clothes={cloth} isEquipped={isEquipped} otherItems={isHat} setOtherItems={setIsHat} setIsEquipped={setIsEquipped} />
                            </> : null}
                        {cloth.category === "Spodnie" ?
                            <>
                                <ButtonSetCloth clothes={cloth} isEquipped={isEquipped} otherItems={isPants} setOtherItems={setIsPants} setIsEquipped={setIsEquipped} />
                                <ButtonRemoveCloth clothes={cloth} isEquipped={isEquipped} otherItems={isPants} setOtherItems={setIsPants} setIsEquipped={setIsEquipped} />
                            </> : null}
                        {cloth.category === "Bluzka" ?
                            <>
                                <ButtonSetCloth clothes={cloth} isEquipped={isEquipped} otherItems={isBlouse} setOtherItems={setIsBlouse} setIsEquipped={setIsEquipped} />
                                <ButtonRemoveCloth clothes={cloth} isEquipped={isEquipped} otherItems={isBlouse} setOtherItems={setIsBlouse} setIsEquipped={setIsEquipped} />
                            </> : null}
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default SingleClothCard;


