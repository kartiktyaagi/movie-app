import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Card = ({ movie, toggleFavorite, isFavorite, setSearchQuery }) => {
    const handleToggleFavorite = useCallback((e) => {
        e.preventDefault();
        toggleFavorite(movie);
        e.stopPropagation();
    }, [movie, toggleFavorite]);

    const { Title, Year, imdbID, Type, Poster } = movie;

    return (
        <Link to={`/movie/${imdbID}`} className="linkStyle">
            <div className="cardContainer">
                <img className='coverImage' src={Poster} alt={Title} />
                <div className="favContainer">
                    <h1 className='movieName'>{Title}</h1>
                    <p onClick={handleToggleFavorite} className={`heartIcon ${isFavorite ? 'favorite' : ''}`}>&#10084;</p>
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
