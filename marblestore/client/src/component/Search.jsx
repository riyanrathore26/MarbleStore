import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../config'; // Ensure BASE_URL is correctly defined in your config file

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const quickcloseHandler = () => {
    setNoResults(false);
    setSearchResults([])
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/search`,
        { searchTerm } // Correctly send the searchTerm in the body
      );

      if (response.status === 200) {
        if (response.data.length === 0) {
          setNoResults(true);
          setSearchResults([]);
        } else {
          setNoResults(false);
          setSearchResults(response.data); // Update search results state with the data
        }
      } else {
        alert('not working');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setNoResults(true);
        setSearchResults([]);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="search-bar-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="search"
            placeholder="Search what you want"
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Display search results */}
      <div className="search-results">
        <button onClick={quickcloseHandler} style={{ position: 'absolute', cursor: 'pointer' }}>
          X
        </button>
        {noResults ? (
          <p>No results found</p>
        ) : (
          searchResults.map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.images[0]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
