// NavigationBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Components_css/NavigationBar.css';
import SearchHistory from './SearchComponent'; // Import your search history component

const inline = {
  marginRight: '3%',
  width: '30%',
};

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowSearchHistory(true);
  };

  const handleSearch = () => {
    // Handle the search logic here
    // For now, let's just log the search term
    console.log(`Searching for: ${searchTerm}`);
    setShowSearchHistory(false);
  };

  return (
    <nav>
      {/* <image>LOGO</image> */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
          <Link>Category</Link>
          <ul className="dropdown">
            <label htmlFor='class1'>Slab</label>
            <div className="class1">
              <li><Link to="#">white</Link></li>
              <li><Link to="#">black</Link></li>
              <li><Link to="#">onex</Link></li>
            </div>
          </ul>
        </li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Signup">Signup</Link></li>
      </ul>

      <input
        type="search"
        placeholder="Search what you want"
        style={inline}
        value={searchTerm}
        onChange={handleInputChange}
      />

      {showSearchHistory && <SearchHistory searchTerm={searchTerm} onSearch={handleSearch} />}

    </nav>
  );
};

export default NavigationBar;
