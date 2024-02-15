import React, { useState } from 'react';
import '../css/./SearchBar.css';
import { searchByNameApi } from '../api/services/productServices';
import { useNavigate } from 'react-router-dom';
export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
searchByNameApi(searchQuery).then((res)=>{
  setResults(res.data);
  navigate('/search', { state: { results: res.data } });
})
  };

  return (
    <div className='search-bar-container'>
    <div className="search-bar-home">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
    </div>
  );
};

export default SearchBar;
