import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonDelete = ({ setOpenPopup }) => {

    return (
        <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenPopup(true)}
        >
            Usuń
        </Button>
    );
}

export default ButtonDelete;