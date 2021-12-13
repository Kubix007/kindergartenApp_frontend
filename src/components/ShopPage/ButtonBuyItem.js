import React from 'react'
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BuyItemPopup from '../../components/Popups/Popup';
import BuyItemForm from '../../components/Forms/BuyItemForm';

const ButtonBuyItem = ({ setOpenPopup, openPopup, userPoints, userDetailsId, item, setBuyingStatusPopup, getUserDetailsAPI }) => {
    return (
        <>
            <Button
                variant="contained"
                color="info"
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={() => setOpenPopup(true)}
            >
                Kup
            </Button>
            <BuyItemPopup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Potwierdzenie akcji"
            >
                <BuyItemForm
                    setOpenPopup={setOpenPopup}
                    item={item}
                    userPoints={userPoints}
                    userDetailsId={userDetailsId}
                    setBuyingStatusPopup={setBuyingStatusPopup}
                    getUserDetailsAPI={getUserDetailsAPI}
                />
            </BuyItemPopup>
        </>
    );
}

export default ButtonBuyItem;