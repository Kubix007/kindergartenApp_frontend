import React from 'react'
import SingleShopClothesCard from './SingleShopClothesCard';

const ShopClothesCardList = ({ singleShopItem, setBuyingStatusPopup, setOpenPopup, userPoints, userDetailsId, getUserDetailsAPI, userClothes }) => {
    return (
        <>
            {singleShopItem.map((shopItem) => {
                return (
                    <SingleShopClothesCard
                        key={shopItem.id}
                        item={shopItem}
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