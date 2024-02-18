import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { MdError } from "react-icons/md";

import Header from './components/header';
import Card from './components/card';
import MovieDetail from './components/movieDetail';

import { useDebounce, API_KEY, API_HEADER } from './utils';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const API_URL = (searchString) => `${API_HEADER}?s=${searchString}&apikey=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let cachedData = localStorage.getItem(debouncedSearchQuery);
        if (cachedData) {
          setMovieList(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
        const response = await axios.get(API_URL(debouncedSearchQuery));
        if (response.data.Response === "True") {
          setMovieList(response.data.Search || []);
          localStorage.setItem(debouncedSearchQuery, JSON.stringify(response.data.Search || []));
          setError('');
        } else {
          setError(response.data.Error || 'Unknown error occurred.');
          setMovieList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('An error occurred while fetching data.');
        setMovieList([]);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearchQuery.trim() !== "") {
      fetchData();
    } else {
      setMovieList([]);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((movie) => {
    const isFavorite = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, movie]);
    }
  }, [favorites]);

  const renderMovieList = useMemo(() => {
    if (loading) {
      return <h1>Loading...</h1>;
    } else if (movieList.length > 0) {
      return movieList.map((movie) => (
        <Card
          setSearchQuery={setSearchQuery}
          key={movie.imdbID}
          movie={movie}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.some((favMovie) => favMovie.imdbID === movie.imdbID)}
        />
      ));
    } else {
      return (
        <h1 className='errorHeading'>
          {error ? (
            <>
              <MdError className='errorIcon' /> API ERROR: {error}
            </>
          ) : (
            'No movies searched.'
          )}
        </h1>
      );

    }
  }, [loading, movieList, error, favorites, toggleFavorite]);

  const renderFavorites = useMemo(() => {
    if (favorites.length === 0) {
      return <h2>No favorite movies added yet.</h2>;
    }
    return favorites.map((movie) => (
      <Card
        key={movie.imdbID}
        movie={movie}
        toggleFavorite={toggleFavorite}
        isFavorite={true}
      />
    ));
  }, [favorites, toggleFavorite]);

  return (
    <Router>
      <div className="App">
        <Header favorites={favorites} onTextChange={(e) => setSearchQuery(e.target.value)} searchQuery={searchQuery} />
        <div className="movieListContainer">
          <Routes>
            <Route path="/" element={renderMovieList} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={renderFavorites} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
