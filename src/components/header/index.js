import React, { useCallback } from "react";
import './index.css';
import { Link, useLocation } from "react-router-dom";

const Header = ({ onTextChange, searchQuery }) => {
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
            <div className="favContainer">
                {pathname === '/' &&
                    <div className="searchBox">
                        <span role="img" aria-label="search-icon">🔍</span>
                        <input onChange={handleInputChange} value={searchQuery} type="text" className="searchInput" placeholder="Please Search..." />
                    </div>
                }
                <Link className="favIcon" to='/favorites'>&#10084;</Link>
            </div>
        </div>
    );
};

export default Header;
