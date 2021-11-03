import React from 'react'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

const ButtonEdit = ({ setOpenPopup }) => {

    return (
        <Button
            variant="contained"
            color="info"
            startIcon={<EditIcon />}
            onClick={() => setOpenPopup(true)}
        >
            Edytuj
        </Button>
    );
}

export default ButtonEdit;