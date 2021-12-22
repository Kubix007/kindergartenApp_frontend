import React from 'react'
import Button from '@mui/material/Button';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

const ButtonAddEmployee = ({ setOpenPopup }) => {

    return (
        <Button
            variant="contained"
            color="success"
            startIcon={<WorkOutlineOutlinedIcon />}
            onClick={() => setOpenPopup(true)}
        >
            Dodaj nauczyciela
        </Button>
    );
}

export default ButtonAddEmployee;