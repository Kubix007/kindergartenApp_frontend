import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import { ColoringBookContext } from '../../context/ColoringBookContext';

const ButtonColoringBook = ({ item }) => {

    // eslint-disable-next-line no-unused-vars
    const { coloringBook, setColoringBook } = useContext(ColoringBookContext);

    const handleClick = () => {
        setColoringBook(item);
    }
    return (
        <NavLink to="/kolorowanka" >
            <Button
                variant="contained"
                color="primary"
                //startIcon={<PaletteOutlinedIcon />}
                onClick={handleClick}
                id="coloringButton"
            >
                Koloruj
            </Button>
        </NavLink>

    );
}

export default ButtonColoringBook;