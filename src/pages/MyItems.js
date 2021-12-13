import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Grid, Container } from '@material-ui/core';
import { Skeleton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import ItemCardList from '../components/MyItems/ItemCardList';
import Repository from '../api/Repository';
import Auth from '../api/Auth';

const resourceItemsAPI = 'items';
const resourceUserDetailsAPI = 'user_details';


const useStyles = makeStyles(theme => ({

    pageContent: {
        margin: theme.spacing(7),
        padding: theme.spacing(3),
    },
}))

const Myitems = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [myItems, setMyItems] = useState([0, 0]);
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
        setIsLoading(true);
        Repository.getById(resourceItemsAPI, userId).then(
            (data) => {
                setMyItems(data.data);
                setIsLoading(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        getUserDetails()
    }, []);

    return (
        <>
            <PageHeader
                title="Przedmioty"
                subTitle="Lista Twoich przedmiotów"
                icon={<ShoppingBagOutlinedIcon fontSize="large" />}
            />
            {myItems.length === 0 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><h1>Brak przedmiotów</h1></div> : null}
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Grid container spacing={3}>
                    {!isLoading ? <ItemCardList items={myItems}
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
        </>
    );
};
export default Myitems;