import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

import './index.css';

const Card = ({ movie, toggleFavorite, isFavorite }) => {
    const { Title, Year, imdbID, Type, Poster } = movie;

    const handleToggleFavorite = useCallback((e) => {
        e.preventDefault();
        toggleFavorite(movie);
    }, [movie, toggleFavorite]);

    return (
        <Link to={`/movie/${imdbID}`} className="linkStyle">
            <div className="cardContainer">
                <img className='coverImage' src={Poster} alt={Title} />
                <div className="favIconContainer">
                    <h1 className='movieName'>{Title}</h1>
                    <div onClick={handleToggleFavorite} className={`whishlist `}>
                        <p className={`wishlistHeart ${isFavorite ? 'favorite' : ''}`}><FaHeart /></p>
                        <p className='wishlistText'>{isFavorite ? 'Remove' : 'Wishlist'}</p>
                    </div>

                </div>

                <div className='infoContainer'>
                    <p className='movieInfo'>Year: {Year}</p>
                    <p className='movieInfo'>Type: {Type}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
