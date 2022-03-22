import React from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonDeleteActivity = ({ setOpenPopup, setActivityId, setActivityParticipants, activityId, activityParticipantCount }) => {

    const handleClick = () => {
        setOpenPopup(true);
        setActivityParticipants(activityParticipantCount);
        setActivityId(activityId);
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<DeleteIcon />}
                size="small"
                onClick={() => handleClick()}
                id="deleteActivityButton"
            >
                Usuń
            </Button>
        </>
    );
}

export default ButtonDeleteActivity;