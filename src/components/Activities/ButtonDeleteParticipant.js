import React from 'react'
import Button from '@material-ui/core/Button';
import Repository from './../../api/Repository';
import { toast } from 'react-toastify';

const resourceParticpantsAPI = 'participants';

const ButtonDeleteParticipant = ({ activityId, participantId, refreshAfterDeleteParticipant, setOpenPopup, setUpdatingStatusPopup }) => {

    const deleteParticipantsAPI = () => {
        setOpenPopup(false);
        setUpdatingStatusPopup(true);
        Repository.deleteParticipant(resourceParticpantsAPI, participantId, activityId).then(
            () => {
                refreshAfterDeleteParticipant();
            },
            (error) => {
                console.log(error);
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
        deleteParticipantsAPI();
    }

    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            id="deleteParticipantButton"
            onClick={handleClick}
        >
            Usuń
        </Button>
    );
}

export default ButtonDeleteParticipant;