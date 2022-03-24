import React from 'react'
import SingleShopClothesCard from './SingleShopClothesCard';

const ShopClothesCardList = ({ singleShopItem, userRole, setBuyingStatusPopup, setOpenPopup, userPoints, userDetailsId, getUserDetailsAPI, userClothes }) => {
    return (
        <>
            {singleShopItem.map((shopItem) => {
                return (
                    <SingleShopClothesCard
                        key={shopItem.id}
                        item={shopItem}
                        userRole={userRole}
                        setOpenPopup={setOpenPopup}
                        userPoints={userPoints}
                        userDetailsId={userDetailsId}
                        setBuyingStatusPopup={setBuyingStatusPopup}
                        getUserDetailsAPI={getUserDetailsAPI}
                        userClothes={userClothes}
                    />)
            })}
        </>
    );
}

export default ShopClothesCardList;