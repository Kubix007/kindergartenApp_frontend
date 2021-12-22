import React from 'react'
import Button from '@mui/material/Button';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';

const ButtonUsersTable = ({ disabled, setIsUsersSelected }) => {
    return (
        <Button
            variant="contained"
            color="info"
            startIcon={<AccessibilityOutlinedIcon />}
            onClick={() => setIsUsersSelected(prevState => !prevState)}
            disabled={disabled}
        >
            Użytkownicy
        </Button>
    );
}

export default ButtonUsersTable;