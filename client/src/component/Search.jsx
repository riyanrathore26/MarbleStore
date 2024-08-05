import React, { useState, useEffect } from 'react';
import { TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;

    const newHistory = [searchTerm, ...history.filter(item => item !== searchTerm)];
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    setSearchTerm('');
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFocus = () => {
    setShowHistory(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowHistory(false), 200); // delay to allow click on dropdown items
  };

  const handleHistoryClick = (item) => {
    setSearchTerm(item);
    handleSearch();
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '24px', padding: '4px 8px', boxShadow: '0 1px 6px rgba(32,33,36,0.28)' }}>
        <SearchIcon style={{ color: '#9aa0a6' }} />
        <TextField
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search..."
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
          style={{ marginLeft: '8px' }}
        />
        <IconButton>
          <MicIcon />
        </IconButton>
        <IconButton>
          <ImageSearchIcon />
        </IconButton>
      </div>
      {showHistory && history.length > 0 && (
        <List style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', borderRadius: '0 0 24px 24px', boxShadow: '0 1px 6px rgba(32,33,36,0.28)', zIndex: 1000 }}>
          {history.map((item, index) => (
            <ListItem button key={index} onClick={() => handleHistoryClick(item)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchBar;
