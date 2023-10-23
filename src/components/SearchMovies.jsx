import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from './API';

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleSearch = async (searchQuery) => {
    try {
      const response = await api.get('/search/movie', {
        params: { query: searchQuery },
      });

      // Update the route with both search query and results
      navigate(`/movies?query=${searchQuery}`, {
        state: { query: searchQuery, searchResults: response.data.results },
      });
    } catch (error) {
      console.error('Error fetching movie details', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  useEffect(() => {
    // Extract search query and search results from the location state
    const { query, searchResults } = currentLocation.state || {};
    if (query && searchResults) {
      setQuery(query);
      setSearchResults(searchResults);
    }
  }, [currentLocation.state]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className='search-btn'>Search</button>
      </form>
      <ul className='search-results'>
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: currentLocation }}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMovies;
