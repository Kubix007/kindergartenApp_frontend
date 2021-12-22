import React from 'react'
import IconButton from '@mui/material/IconButton';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const ButtonEditEmployee = ({ setOpenPopup, setEditedEmployee, employee }) => {

    const handleClick = () => {
        setEditedEmployee(employee);
        setOpenPopup(true);
    }

    return (
        <IconButton
            size='large'
            style={{ backgroundColor: '#256CE1', color: 'white', }}
            onClick={handleClick}
        >
            <ModeEditOutlinedIcon />
        </IconButton>
    );
}

export default ButtonEditEmployee;