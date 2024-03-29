import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, Grid } from '@material-ui/core';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ButtonColoringBook from './ButtonColoringBook';
import ButtonPreviewColoringBook from './ButtonPreviewColoringBook';
import PreviewColoringBookForm from '../Forms/PreviewColoringBookForm';
import PreviewColoringBookPopup from './../Popups/Popup';
import ButtonDeleteItem from './ButtonDeleteItem';
import DeletePopup from '../Popups/Popup';
import DeleteItemForm from '../Forms/DeleteItemForm';

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

const SingleItemCard = ({ item, getItemsAPI, setUpdatingStatusPopup }) => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupDelete, setOpenPopupDelete] = useState(false);

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
                                {item.item_name}
                            </Typography>
                            <Typography class="itemCategory" gutterBottom variant="h7" component="h4">
                                {item.category}
                            </Typography>
                        </CardContent>
                        {item.category === "Kolorowanka" ? <CardActions className={classes.cardActions}>
                            <ButtonColoringBook item={item} />
                            <ButtonPreviewColoringBook item={item} setOpenPopup={setOpenPopup} />
                            <ButtonDeleteItem setOpenPopup={setOpenPopupDelete} />
                        </CardActions> : null}
                    </CardActionArea>
                </Card>
            </Grid>
            <PreviewColoringBookPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Podgląd kolorowanki"
                maxWidth="lg"
                onClose={() => setOpenPopup(false)}
            >
                <PreviewColoringBookForm
                    setOpenPopup={setOpenPopup}
                />
            </PreviewColoringBookPopup>
            <DeletePopup
                openPopup={openPopupDelete}
                setOpenPopup={setOpenPopupDelete}
                title="Potwierdzenie akcji"
            >
                <DeleteItemForm
                    itemId={item.id}
                    getItemsAPI={getItemsAPI}
                    setOpenPopup={setOpenPopupDelete}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                />
            </DeletePopup>
        </>
    );
}

export default SingleItemCard;


