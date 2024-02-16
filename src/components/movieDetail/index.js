import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { API_KEY } from '../../App';

const MovieDetail = () => {
    const [movieInfo, setMovieInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
                setMovieInfo(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movieInfo) {
        return <div className="loading">Loading...</div>;
    }

    const { Title, Poster, Ratings, imdbVotes, Runtime, Released, Actors, Plot } = movieInfo;

    return (
        <div className="movieDetails">
            <div className="detailLeft">
                {Poster && <img className="poster" src={Poster} alt={Title} />}
            </div>

            <div className="detailRight">
                <h1 className="movieName">{Title || 'N/A'}</h1>
                <div>
                    <strong>Rating:</strong> {Ratings && Ratings.length > 0 ? Ratings[0].Value : 'N/A'}
                    <span className="voteCount"><strong>Votes :</strong> {imdbVotes || 'N/A'}</span>
                </div>
                <p><strong>Total Duration:</strong> {Runtime || 'N/A'} mins</p>
                <p><strong>Released :</strong> {Released || 'N/A'}</p>
                <p><strong>Actors :</strong> {Actors || 'N/A'}</p>

                <div className="detailRightBottom">
                    <h2 className="plotText">Plot</h2>
                    <p>{Plot || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
