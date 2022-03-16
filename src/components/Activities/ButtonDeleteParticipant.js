import React from 'react'
import Button from '@material-ui/core/Button';
import Repository from './../../api/Repository';
import { toast } from 'react-toastify';

const resourceParticpantsAPI = 'participants';

const ButtonDeleteParticipant = ({ activityId, participantId, getActivitiesAPI, setOpenPopup }) => {

    const deleteParticipantsAPI = () => {
        Repository.deleteParticipant(resourceParticpantsAPI, participantId, activityId).then(
            () => {
                toast.success(`Pomyślnie usunięto uczestnika`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulDeleteParticipantToast"

                });
            },
            (error) => {
                toast.error(`Nie udało się usunąć uczestnika`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        );
    }

    const handleClick = () => {
        setOpenPopup(false);
        deleteParticipantsAPI();
        getActivitiesAPI();
    }

    return (
        <Button
            variant="contained"
            color="primary"
            size="medium"
            id="deleteParticipantButton"
            onClick={handleClick}
        >
            Usuń
        </Button>
    );
}

export default ButtonDeleteParticipant;