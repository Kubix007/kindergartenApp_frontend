import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardList from '../components/MyItems/ItemCardList';
import Repository from '../api/Repository';
import Auth from '../api/Auth';
import UpdatingStatusPopup from '../components/Popups/Popup';
import UpdatingStatusForm from '../components/Forms/UpdatingStatusForm';

const resourceUsersColoringBooksAPI = 'users_coloring_books';
const resourceUserDetailsAPI = 'user_details';


const useStyles = makeStyles(theme => ({

    pageContent: {
        margin: theme.spacing(7),
        padding: theme.spacing(3),
    },
}))

const Myitems = () => {
    const classes = useStyles();
    const [myItems, setMyItems] = useState([0, 0]);
    const [updatingStatusPopup, setUpdatingStatusPopup] = useState(true);
    let userId = null;

    const getUserDetails = () => {
        let id = parseInt(Auth.getUserId());
        Repository.getById(resourceUserDetailsAPI, id).then(
            (data) => {
                userId = data.data.data.user_id;
                getItemsAPI(userId);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const getItemsAPI = (userId) => {
        Repository.getById(resourceUsersColoringBooksAPI, userId).then(
            (data) => {
                setMyItems(data.data);
                setUpdatingStatusPopup(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageHeader
                title="Przedmioty"
                subTitle="Lista Twoich przedmiotów"
                icon={<ShoppingBagOutlinedIcon fontSize="large" />}
            />
            {myItems.length === 0 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h1 id="noItemsInfo">Brak przedmiotów</h1></div> : null}
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Grid container spacing={3}>
                    {!updatingStatusPopup ? <ItemCardList setUpdatingStatusPopup={setUpdatingStatusPopup} getItemsAPI={getUserDetails} items={myItems}
                    /> : null}
                </Grid>
            </Container>
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
};
export default Myitems;