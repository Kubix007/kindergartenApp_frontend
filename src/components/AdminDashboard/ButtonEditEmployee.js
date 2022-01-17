import React from 'react'
import Button from '@material-ui/core/Button';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const ButtonEditEmployee = ({ setOpenPopup, setEditedEmployee, employee }) => {

    const handleClick = () => {
        setEditedEmployee(employee);
        setOpenPopup(true);
    }

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<ModeEditOutlinedIcon />}
            onClick={handleClick}
            size='small'
        >
            Edytuj
        </Button>
    );
}

export default ButtonEditEmployee;