import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ImSpinner8 } from 'react-icons/im'

import { API_HEADER, API_KEY } from '../../utils';

import './index.css';

const MovieDetail = () => {
    const [movieInfo, setMovieInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { Title = 'N/A', Poster, Ratings = [], imdbVotes = 'N/A', Runtime = 'N/A', Released = 'N/A', Actors = 'N/A', Plot = 'N/A' } = movieInfo || {};

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!id) return;

            const API_URL = `${API_HEADER}?i=${id}&apikey=${API_KEY}`;
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                setMovieInfo(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <ImSpinner8 className='loadingIcon' />
    }


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
                <p><strong>Total Duration:</strong> {Runtime}</p>
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
