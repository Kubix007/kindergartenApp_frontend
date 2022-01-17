import React from 'react'
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BuyItemPopup from '../../components/Popups/Popup';
import BuyItemClothing from '../../components/Forms/BuyItemClothing';

const ButtonBuyClothes = ({ setOpenPopup, openPopup, userPoints, userDetailsId, item, setBuyingStatusPopup, getUserDetailsAPI }) => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
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
                <BuyItemClothing
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

export default ButtonBuyClothes;