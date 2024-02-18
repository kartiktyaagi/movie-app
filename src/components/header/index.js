import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";

import './index.css';

const Header = ({ onTextChange, searchQuery, favorites }) => {
    const { pathname } = useLocation();

    const handleInputChange = (e) => {
        onTextChange(e);
    }

    return (
        <div className="header">
            <Link className="logoContainer" to='/'>
                <img className="headerIcon" src="https://cdn-icons-png.flaticon.com/512/2798/2798007.png" alt="Movie App Icon" />
                <h1 className="headerTitle">Movie App</h1>
            </Link>
            <div className="favHeaderContainer">
                {pathname === '/' &&
                    <div className="searchBox">
                        <span role="img" aria-label="search-icon"><FaSearch /></span>
                        <input onChange={handleInputChange} value={searchQuery} type="text" className="searchInput" placeholder="Search Movies..." />
                    </div>
                }
                <Link to='/favorites' className="favLink">
                    <div className="favIcon">
                        <FaHeart className="heartIcon" />
                        {favorites.length > 0 && <p className="counter">{favorites.length}</p>}
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default Header;
