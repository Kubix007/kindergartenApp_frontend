import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
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
                color="info"
                startIcon={<PaletteOutlinedIcon />}
                onClick={handleClick}
            >
                Pokoloruj
            </Button>
        </NavLink>

    );
}

export default ButtonColoringBook;