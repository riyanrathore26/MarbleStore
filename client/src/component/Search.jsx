import React, { useState } from 'react';
import { TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim().length < 3) return;

    try {
      const response = await axios.post(`${BASE_URL}/api/search`, { searchTerm });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim().length >= 3) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  };

  const nextPage = (productId) => {
    navigate('/subProduct', { state: { productId } });
  };

  const handleCloseResults = () => {
    alert("ji")
    setSearchResults([]);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <SearchIcon className="search-icon" />
        <TextField
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
        <IconButton>
          <ImageSearchIcon />
        </IconButton>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          <IconButton onClick={handleCloseResults} className="close-results">
            <CloseIcon />
          </IconButton>
          <List className="results-list">
            {searchResults.map((result, index) => (
              <div className="searchResult" onClick={() => nextPage(result._id)} key={index}>
                <ListItem button>
                  <img src={result.images[0]} alt="" className="result-image" />
                  <ListItemText primary={result.name} secondary={result.description} />
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
