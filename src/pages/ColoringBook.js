import React, { useEffect, useContext, useState } from 'react'
import PageHeader from '../components/PageHeader';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { Paper, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ColoringBookContext } from '../context/ColoringBookContext';
import { HexColorPicker } from "react-colorful";
import ButtonSaveImage from '../components/ColoringBook/ButtonSaveImage';
import './../App.css'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
    },
    colorPicker: {
        margin: theme.spacing(5),
        justifyContent: 'center',
    },
    buttonSave: {
        margin: theme.spacing(1),
    }
}))

const ColoringBook = () => {
    const classes = useStyles();
    // eslint-disable-next-line no-unused-vars
    const { coloringBook, setColoringBook } = useContext(ColoringBookContext);
    const [color, setColor] = useState("#aabbcc");

    function showArea(event) {
        event.target.setAttribute("fill", color)
    };

    function render_xml(id, xml_string) {
        var el = document.getElementById(id)
        var doc = new DOMParser().parseFromString(xml_string, 'text/html');
        if (el.hasChildNodes()) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            el.appendChild(
                el.ownerDocument.importNode(doc.documentElement, true),
            )
        } else {
            el.appendChild(
                el.ownerDocument.importNode(doc.documentElement, true),
            )
        }

        var elements = Array.from(document.getElementsByClassName('paint'));
        elements.forEach(function (el) {
            el.addEventListener("click", showArea, false);
        })
    }

    useEffect(() => {
        render_xml(`coloring`, coloringBook.source);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        var elements = Array.from(document.getElementsByClassName('paint'));
        elements.forEach(function (el) {
            el.addEventListener("click", showArea, false);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color]);

    return (
        <>
            <PageHeader
                title="Kolorowanka"
                subTitle="Pokoloruj swój obrazek"
                icon={<PaletteOutlinedIcon fontSize="large" />}
            />
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Grid container justify="center" spacing={1} className={classes.pageContent}>
                    <Grid item >
                        <Paper elevation={6}><div id="coloring"></div></Paper>
                    </Grid>
                    <Grid item >
                        <Grid container direction='column' justifyContent='center' alignItems='center'>
                            <HexColorPicker color={color} onChange={setColor} />
                            <Grid item className={classes.buttonSave}><ButtonSaveImage coloringImage={coloringBook} /></Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default ColoringBook;