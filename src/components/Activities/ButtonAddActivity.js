import React from 'react'
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const ButtonAddActivity = ({ setOpenPopup }) => {
    return (
        <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={() => setOpenPopup(true)}
        >
            Dodaj grupę
        </Button>
    );
}

export default ButtonAddActivity;