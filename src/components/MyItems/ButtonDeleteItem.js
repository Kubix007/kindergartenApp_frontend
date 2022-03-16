import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonDeleteItem = ({ setOpenPopup }) => {

    const handleClick = () => {
        setOpenPopup(true);
    }

    return (
        <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            id="deleteItemButton"
        >
            Usuń
        </Button>
    );
}

export default ButtonDeleteItem;