import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { API_KEY } from '../../App';

const MovieDetail = () => {
    const [movieInfo, setMovieInfo] = useState(null);
    const { id } = useParams();
    const API_URL = useMemo(() => `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`, [id]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(API_URL);
                setMovieInfo(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [API_URL]);

    if (!movieInfo) {
        return <div className="loading">Loading...</div>;
    }

    const { Title = 'N/A', Poster, Ratings = [], imdbVotes = 'N/A', Runtime = 'N/A', Released = 'N/A', Actors = 'N/A', Plot = 'N/A' } = movieInfo;

    return (
        <div className="movieDetails">
            <div className="detailLeft">
                {Poster && <img className="poster" src={Poster} alt={Title} />}
            </div>

            <div className="detailRight">
                <h1 className="movieName">{Title}</h1>
                <div>
                    <strong>Rating:</strong> {Ratings.length > 0 ? Ratings[0].Value : 'N/A'}
                    <span className="voteCount"><strong>Votes :</strong> {imdbVotes}</span>
                </div>
                <p><strong>Total Duration:</strong> {Runtime} mins</p>
                <p><strong>Released :</strong> {Released}</p>
                <p><strong>Actors :</strong> {Actors}</p>

                <div className="detailRightBottom">
                    <h2 className="plotText">Plot</h2>
                    <p>{Plot}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
