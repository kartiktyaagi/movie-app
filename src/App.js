import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header';
import Card from './components/card';
import MovieDetail from './pages/movieDetail'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';

export const API_KEY = "b5abe711";
const API_URL = (searchString) => `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL(searchQuery));
        if (response.data.Response === "True") {
          setMovieList(response.data.Search || []);
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

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchData();
      } else {
        setMovieList([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleTextChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const renderMovieList = () => {
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
      return <h1>{error ? `API ERROR: ${error}` : 'No movies Searched.'}</h1>;
    }
  };

  const renderFavorites = () => {
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
  };


  return (
    <Router>
      <div className="App">
        <Header onTextChange={handleTextChange} searchQuery={searchQuery} />
        <div className="movieListContainer">
          <Routes>
            <Route path="/" element={renderMovieList()} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={renderFavorites()} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
