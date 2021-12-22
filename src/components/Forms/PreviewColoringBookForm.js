import React, { useEffect, useContext } from 'react'
import {
    Grid,
} from '@material-ui/core';
import { ColoringBookContext } from '../../context/ColoringBookContext';

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
}

const PreviewColoringBookForm = ({ setOpenPopup }) => {
    // eslint-disable-next-line no-unused-vars
    const { coloringBook, setColoringBook } = useContext(ColoringBookContext);

    useEffect(() => {
        render_xml(`coloring`, coloringBook.source);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container component="main" direction="column">
            <Grid item xs={12}>
                <div id="coloring"></div>
            </Grid>
        </Grid>
    );
}

export default PreviewColoringBookForm;