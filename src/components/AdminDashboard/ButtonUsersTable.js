import React from 'react'
import Button from '@material-ui/core/Button';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';

const ButtonUsersTable = ({ disabled, setIsUsersSelected }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<AccessibilityOutlinedIcon />}
            onClick={() => setIsUsersSelected(prevState => !prevState)}
            disabled={disabled}
        >
            Użytkownicy
        </Button>
    );
}

export default ButtonUsersTable;