import React from 'react'
import Button from '@material-ui/core/Button';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

const ButtonAddEmployee = ({ setOpenPopup }) => {

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<WorkOutlineOutlinedIcon />}
            onClick={() => setOpenPopup(true)}
        >
            Dodaj nauczyciela
        </Button>
    );
}

export default ButtonAddEmployee;