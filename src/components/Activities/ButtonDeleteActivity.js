import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteActivityPopup from '../Popups/Popup';
import DeleteActivityForm from '../Forms/DeleteActivityForm';

const ButtonDeleteActivity = ({ setOpenPopup, getActivitiesAPI, activityId, openPopup }) => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={() => setOpenPopup(true)}
            >
                Usuń
            </Button>
            <DeleteActivityPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Potwierdzenie akcji"
            >
                <DeleteActivityForm
                    getActivitiesAPI={getActivitiesAPI}
                    setOpenPopup={setOpenPopup}
                    activityId={activityId}
                />
            </DeleteActivityPopup>
        </>
    );
}

export default ButtonDeleteActivity;