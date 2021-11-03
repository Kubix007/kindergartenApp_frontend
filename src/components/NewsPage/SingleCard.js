import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, Grid } from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonDelete from './ButtonDelete';
import ButtonEdit from './ButtonEdit';
import DeleteNewsForm from '../Forms/DeleteNewsForm';
import DeletePopup from '../NewsPage/Popup';
import EditPopup from '../NewsPage/Popup';
import EditNewsForm from '../Forms/EditNewsForm';
import Auth from '../../api/Auth';

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


const SingleCard = ({ image, title, date, description, newsId, getNewsAPI, }) => {
    const classes = useStyles();
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [openPopupDelete, setOpenPopupDelete] = useState(false);

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                            <Typography gutterBottom variant="h7" component="h4">
                                Data dodania: {date}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>
                        </CardContent>
                        {JSON.parse(Auth.getRole()) === "ADMIN" ? <CardActions className={classes.cardActions}>
                            <ButtonEdit newsId={newsId} getNewsAPI={getNewsAPI} setOpenPopup={setOpenPopupEdit} />
                            <ButtonDelete newsId={newsId} getNewsAPI={getNewsAPI} setOpenPopup={setOpenPopupDelete} />
                        </CardActions> : null}
                    </CardActionArea>
                </Card>
            </Grid>
            <DeletePopup
                openPopup={openPopupDelete}
                setOpenPopup={setOpenPopupDelete}
                title="Potwierdzenie akcji"
            >
                <DeleteNewsForm
                    newsId={newsId}
                    getNewsAPI={getNewsAPI}
                    setOpenPopup={setOpenPopupDelete}
                />
            </DeletePopup>
            <EditPopup
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                title="Edytuj aktualność"
            >
                <EditNewsForm
                    newsId={newsId}
                    getNewsAPI={getNewsAPI}
                    newsTitle={title}
                    newsDescription={description}
                    setOpenPopup={setOpenPopupEdit}
                />
            </EditPopup>
        </>
    );
}

export default SingleCard;