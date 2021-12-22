import React from 'react'
import Button from '@mui/material/Button';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const ButtonEmployeesTable = ({ setIsUsersSelected, disabled }) => {
    return (
        <Button
            variant="contained"
            color="info"
            startIcon={<BadgeOutlinedIcon />}
            onClick={() => setIsUsersSelected(prevState => !prevState)}
            disabled={disabled}
        >
            Nauczyciele
        </Button>
    );
}

export default ButtonEmployeesTable;