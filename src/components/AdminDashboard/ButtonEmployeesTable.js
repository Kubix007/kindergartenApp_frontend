import React from 'react'
import Button from '@material-ui/core/Button';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const ButtonEmployeesTable = ({ setIsUsersSelected, disabled }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<BadgeOutlinedIcon />}
            onClick={() => setIsUsersSelected(prevState => !prevState)}
            disabled={disabled}
        >
            Nauczyciele
        </Button>
    );
}

export default ButtonEmployeesTable;