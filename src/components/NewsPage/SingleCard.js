import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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


const SingleCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        React useContext
                    </Typography>
                    <Typography gutterBottom variant="h7" component="h4">
                        Data dodania: 23.10.2021
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button variant="contained" color="info" >Edytuj</Button>
                    <Button variant="contained" color="error">Usuń</Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default SingleCard;