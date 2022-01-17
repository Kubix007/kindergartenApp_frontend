import React from 'react'
import Button from '@material-ui/core/Button';
import EditIcon from '@mui/icons-material/Edit';

const ButtonEdit = ({ setOpenPopup }) => {

    return (
        <Button variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => setOpenPopup(true)}>
            Edytuj
        </Button>
    );


}

export default ButtonEdit;