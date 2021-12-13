import React from 'react'
import Button from '@mui/material/Button';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { toast } from 'react-toastify';
import Repository from '../../api/Repository';

const ButtonSaveImage = ({ coloringImage }) => {

    const updateItemsAPI = (data) => {
        Repository.update('items', coloringImage.id, data).then(
            () => {
                toast.success(`Pomyślnie zaktualizowano kolorowankę`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            },
            () => {
                toast.error(`Nie udało się zaktualizować kolorowanki`, {
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
        var el = document.getElementsByClassName('svgImage')[0];
        const data = {
            source: el.outerHTML,
        }
        updateItemsAPI(data);
    }

    return (
        <Button
            variant="contained"
            color="success"
            startIcon={<SaveOutlinedIcon />}
            onClick={handleClick}
            size='large'
        >
            Zapisz
        </Button>
    );
}

export default ButtonSaveImage;