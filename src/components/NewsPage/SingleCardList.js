import React from 'react'
import SingleCard from './SingleCard';

const SingleCardList = ({ singleNews, getNewsAPI, setOpenPopup }) => {
    return (
        <>
            {singleNews.map((news) => (
                <SingleCard
                    key={news.id}
                    newsId={news.id}
                    type={news.type}
                    title={news.title}
                    date={(news.created_at.slice(0, 10))}
                    description={news.description}
                    getNewsAPI={getNewsAPI}
                    setOpenPopup={setOpenPopup}
                />
            ))}
        </>
    );
}

export default SingleCardList;