import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'


const Card = ({ movie, toggleFavorite, isFavorite, setSearchQuery }) => {
    const handleToggleFavorite = (e) => {
        e.preventDefault();
        toggleFavorite(movie);
        e.stopPropagation();
    };
    const { Title, Year, imdbID, Type, Poster } = movie;
    return (
        <Link onClick={() => setSearchQuery('')} className="linkStyle" to={`/movie/${imdbID}`}>
            <div className="cardContainer" >
                <img className='coverImage' src={Poster} alt={Title} />
                <div className="favContainer">
                    <h1 className='movieName'>{Title}</h1>
                    <p onClick={handleToggleFavorite} style={isFavorite ? { color: 'red' } : {}} className='heartIcon'>&#10084;</p>
                </div>

                <div className='infoContainer'>
                    <p className='movieInfo'>
                        Year : {Year}
                    </p>
                    <p className='movieInfo'>
                        Type : {Type}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
