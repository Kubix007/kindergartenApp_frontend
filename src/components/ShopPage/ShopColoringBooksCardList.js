import React from 'react'
import SingleShopColoringBookCard from './SingleShopColoringBookCard';

const ShopColoringBooksCardList = ({ singleShopItem, setBuyingStatusPopup, setOpenPopup, userPoints, userDetailsId, getUserDetailsAPI }) => {
    return (
        <>
            {singleShopItem.map((shopItem) => {
                return (
                    <SingleShopColoringBookCard
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

export default ShopColoringBooksCardList;