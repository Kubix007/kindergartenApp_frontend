import React from 'react'
import SingleShopCard from './SingleShopCard';

const ShopCardList = ({ singleShopItem, getShopAPI, setOpenPopup }) => {
    return (
        <>
            {singleShopItem.map((shopItem) => {
                return (
                    <SingleShopCard
                        key={shopItem.id}
                        shopItemId={shopItem.id}
                        category={shopItem.category}
                        itemName={shopItem.item_name}
                        image={shopItem.image}
                        source={shopItem.source}
                        cost={shopItem.cost}
                        getShopAPI={getShopAPI}
                        setOpenPopup={setOpenPopup}
                    />)
            })}
        </>
    );
}

export default ShopCardList;