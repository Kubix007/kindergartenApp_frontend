import React from 'react'
import SingleItemCard from './SingleItemCard';

const ItemCardList = ({ items }) => {
    return (
        <>
            {items.map((item) => {
                return (
                    <SingleItemCard
                        key={item.id}
                        item={item}
                    />)
            })}
        </>
    );
}

export default ItemCardList;