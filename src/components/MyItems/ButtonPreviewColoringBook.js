import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { ColoringBookContext } from '../../context/ColoringBookContext';

const ButtonColoringBook = ({ item, setOpenPopup }) => {

    // eslint-disable-next-line no-unused-vars
    const { coloringBook, setColoringBook } = useContext(ColoringBookContext);

    const handleClick = () => {
        setColoringBook(item);
        setOpenPopup(true);
    }
    return (
        <Button
            variant="contained"
            color="success"
            startIcon={<RemoveRedEyeOutlinedIcon />}
            onClick={handleClick}
        >
            Podgląd
        </Button>
    );
}

export default ButtonColoringBook;