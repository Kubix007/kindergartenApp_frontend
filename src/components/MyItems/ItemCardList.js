import React from 'react'
import SingleItemCard from './SingleItemCard';

const ItemCardList = ({ items, getItemsAPI, setUpdatingStatusPopup }) => {
    return (
        <>
            {items.map((item) => {
                return (
                    <SingleItemCard
                        key={item.id}
                        item={item}
                        getItemsAPI={getItemsAPI}
                        setUpdatingStatusPopup={setUpdatingStatusPopup}
                    />)
            })}
        </>
    );
}

export default ItemCardList;