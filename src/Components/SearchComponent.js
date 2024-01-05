// SearchHistory.js
import React from 'react';

const cssstyle = {
  position: 'absolute', // Use colon instead of semicolon
  top: 'calc(100% + -25px)', /* Position it below the input */
  right: 0,
  width: '32%', /* Make it full width */
  backgroundColor: '#fff', /* Background color */
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', /* Add shadow for a card-like effect */
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 2, /* Ensure it appears above the content */
};


const SearchHistory = ({ searchTerm, onSearch }) => {
  return (
    <div className='SeachComponent' style={cssstyle}>
      {/* Display search history and provide an option to execute the search */}
      <h3>Search History: hellow</h3>
      <h3>Search History: hellow</h3>
      <h3>Search History: hellow</h3>
      <h3>Search History: hellow</h3>
      <h3>Search History: hellow</h3>
      <h3>Search History: hellow</h3>
      <h3>Search History: hellow</h3>
    </div>
  );
};

export default SearchHistory;
