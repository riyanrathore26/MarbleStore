// NavigationBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Components_css/NavigationBar.css';
import SearchHistory from './SearchComponent'; // Import your search history component

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.value.length > 3) {
      setSearchTerm(event.target.value);
      setShowSearchHistory(event.target.value !== ''); // Show search history only if there is a search term
    }
  };

  const handleSearch = () => {
    // Handle the search logic here
    // For now, let's just log the search term
    console.log(`Searching for: ${searchTerm}`);
    setShowSearchHistory(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Handle Enter key press
      alert(`Search on Enter: ${searchTerm}`);
    }
  };

  const handleResearchClick = () => {
    // Handle click on research text
    alert('Research clicked');
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
        <li><Link to="/Seller">Seller</Link></li>
        <li><Link to="/Signup">Signup</Link></li>
      </ul>

      <div className="search-input-container">
        <input
          type="search"
          placeholder="Search what you want"
          className='inline'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      {showSearchHistory && <SearchHistory searchTerm={searchTerm} onSearch={handleSearch} onResearchClick={handleResearchClick} />}
    </nav>
  );
};

export default NavigationBar;
