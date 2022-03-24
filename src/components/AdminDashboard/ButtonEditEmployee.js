import React from 'react'
import Button from '@material-ui/core/Button';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        alignItems: "right",
        justifyContent: "right",
        marginLeft: theme.spacing(5),
    },
}));

const ButtonEditEmployee = ({ setOpenPopup, setEditedEmployee, employee }) => {
    const classes = useStyles();


    const handleClick = () => {
        setEditedEmployee(employee);
        setOpenPopup(true);
    }

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            endIcon={<ModeEditOutlinedIcon />}
            onClick={handleClick}
            size='small'
            id="editEmployeeButton"

        >
            Edytuj
        </Button>
    );
}

export default ButtonEditEmployee;