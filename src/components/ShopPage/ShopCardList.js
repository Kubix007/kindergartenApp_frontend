import React from 'react'
import SingleShopCard from './SingleShopCard';

const ShopCardList = ({ singleShopItem, setBuyingStatusPopup, setOpenPopup, userPoints, userDetailsId, getUserDetailsAPI }) => {
    return (
        <>
            {singleShopItem.map((shopItem) => {
                return (
                    <SingleShopCard
                        key={shopItem.id}
                        item={shopItem}
                        setOpenPopup={setOpenPopup}
                        userPoints={userPoints}
                        userDetailsId={userDetailsId}
                        setBuyingStatusPopup={setBuyingStatusPopup}
                        getUserDetailsAPI={getUserDetailsAPI}
                    />)
            })}
        </>
    );
}

export default ShopCardList;