import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonDeleteEmployee = ({ setOpenPopup, setEditedEmployee, employee }) => {

    const handleClick = () => {
        setEditedEmployee(employee);
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

export default ButtonDeleteEmployee;