import React from 'react';
import '../Components_css/SearchComponent.css'

const cssstyle = {
  position: 'absolute',
  top: 'calc(100% + -25px)',
  right: '4%',
  width: '30%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 2,
};

const SearchHistory = ({ searchTerm, onSearch, onResearchClick }) => {
  const handleItemClick = (item) => {
    // Handle click on search history item
    alert(`Search History Clicked: ${item}`);
  };

  return (
    <div className='SearchComponent' style={cssstyle}>
      <h3 className="history-item" onClick={() => handleItemClick('World')}>
        Search History: World
      </h3>
      <h3 className="history-item" onClick={() => handleItemClick('React')}>
        Search History: React
      </h3>
    </div>
  );
};

export default SearchHistory;
