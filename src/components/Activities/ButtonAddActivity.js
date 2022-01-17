import React from 'react'
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const ButtonAddActivity = ({ setOpenPopup, disabled }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={() => setOpenPopup(true)}
            disabled={disabled}
        >
            Dodaj grupę
        </Button>
    );
}

export default ButtonAddActivity;