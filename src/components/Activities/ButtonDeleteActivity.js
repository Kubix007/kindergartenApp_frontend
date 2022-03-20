import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteActivityPopup from '../Popups/Popup';
import DeleteActivityForm from '../Forms/DeleteActivityForm';

const ButtonDeleteActivity = ({ setOpenPopup, refreshAfterDeleteActivity, activity, openPopup, setUpdatingStatusPopup }) => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={() => setOpenPopup(true)}
                id="deleteActivityButton"
            >
                Usuń
            </Button>
            <DeleteActivityPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Potwierdzenie akcji"
            >
                <DeleteActivityForm
                    setOpenPopup={setOpenPopup}
                    refreshAfterDeleteActivity={refreshAfterDeleteActivity}
                    setUpdatingStatusPopup={setUpdatingStatusPopup}
                    activityId={activity.id}
                    activityParticipants={activity.participantCount}
                />
            </DeleteActivityPopup>
        </>
    );
}

export default ButtonDeleteActivity;