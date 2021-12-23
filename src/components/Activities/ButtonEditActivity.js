import React from 'react'
import Button from '@material-ui/core/Button';
import EditIcon from '@mui/icons-material/Edit';

const ButtonEditActivity = ({ activity, setOpenPopup, openPopup, setEditedGroup }) => {

    const handleClick = () => {
        setEditedGroup(activity)
        setOpenPopup(true);
    }

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            size="small"
            onClick={() => handleClick()}
        >
            Edytuj
        </Button>
    );
}

export default ButtonEditActivity;