import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Repository from './../api/Repository';
import { Skeleton } from '@mui/material';
import ShopCardList from '../components/ShopPage/ShopCardList';

const resourceAPI = 'shop';

const useStyles = makeStyles(theme => ({

    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}))

const Shop = () => {
    const classes = useStyles();
    // eslint-disable-next-line no-unused-vars
    const [openPopup, setOpenPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [ItemShop, setItemShop] = useState();
    const getShopAPI = () => {
        setIsLoading(true);
        Repository.getAll(resourceAPI).then(
            (data) => {
                setTimeout(() => {
                    setItemShop(data.data);
                    setIsLoading(false);
                }, 1000)
            },
            (error) => {
                console.log(error);
            }
        )
    }

    // function render_xml(id, xml_string) {
    //     var doc = new DOMParser().parseFromString(xml_string, 'application/xml');
    //     var el = document.getElementById(id)
    //     el.appendChild(
    //         el.ownerDocument.importNode(doc.documentElement, true),
    //     )
    // }

    useEffect(() => {
        getShopAPI();
        // render_xml(`foo`, `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><g id="Spodnie"><title>Spodnie</title><rect id="svg_3" height="180" width="85" y="222" x="313" stroke="#000" fill="#84D3DB"/><rect id="svg_7" height="180" width="85" y="222" x="399" stroke="#000" fill="#84D3DB"/></g></svg>`);
    }, []);

    // const onClick = () => {
    //     document.getElementById('svg_3').setAttribute('fill', "#ff0000");
    // }

    return (
        <>
            <PageHeader
                title="Sklep"
                subTitle="Tutaj wykupisz nagrody za punkty"
                icon={<StoreOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>

                <Grid container spacing={3}>
                    {!isLoading ? <ShopCardList singleShopItem={ItemShop} getShopAPI={getShopAPI} setOpenPopup={setOpenPopup}
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
export default Shop;