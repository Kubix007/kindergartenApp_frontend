import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonDelete = ({ setOpenPopup }) => {

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenPopup(true)}
        >
            Usuń
        </Button>
    );
}

export default ButtonDelete;