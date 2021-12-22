import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonDeleteUser = ({ setOpenPopup, setEditedUser, user }) => {

    const handleClick = () => {
        setEditedUser(user);
        setOpenPopup(true);
    }

    return (
        <IconButton
            size='large'
            style={{ backgroundColor: '#C62828', color: 'white' }}
            onClick={handleClick}

        >
            <DeleteIcon />
        </IconButton>
    );
}

export default ButtonDeleteUser;