import React from 'react'
import Button from '@material-ui/core/Button';

const ButtonAddPoints = ({ setOpenPopup, child, setKid }) => {

    const handleClick = () => {
        setKid(child);
        setOpenPopup(true);
    }

    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClick}
        >
            Punkty
        </Button>
    );
}

export default ButtonAddPoints;