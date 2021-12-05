import React from 'react'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

const ButtonEditActivity = ({ activity, setOpenPopup, openPopup, setEditedGroup }) => {

    const handleClick = () => {
        setEditedGroup(activity)
        setOpenPopup(true);
    }

    return (
        <Button
            variant="contained"
            color="info"
            startIcon={<EditIcon />}
            size="small"
            onClick={() => handleClick()}
        >
            Edytuj
        </Button>
    );
}

export default ButtonEditActivity;