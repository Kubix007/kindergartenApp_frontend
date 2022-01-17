import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonDeleteUser = ({ setOpenPopup, setEditedUser, user }) => {

    const handleClick = () => {
        setEditedUser(user);
        setOpenPopup(true);
    }

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={handleClick}
            size='small'
        >
            Usuń
        </Button>
    );
}

export default ButtonDeleteUser;