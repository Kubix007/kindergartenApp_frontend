import React from 'react'
import Button from '@mui/material/Button';

const ButtonAddPoints = ({ setOpenPopup, child, setKid }) => {

    const handleClick = () => {
        setKid(child);
        setOpenPopup(true);
    }

    return (
        <Button
            variant="contained"
            color="info"
            size="small"
            onClick={handleClick}
        >
            Punkty
        </Button>
    );
}

export default ButtonAddPoints;