import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import api from './API';

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Use the useNavigate hook
  const currentLocation = useLocation();

  const handleSearch = async () => {
    try {
      const response = await api.get('/search/movie', {
        params: { query },
      });
      setSearchResults(response.data.results);

      // Update the route with the search query
      navigate(`/movies?query=${query}`);
    } catch (error) {
      console.error('Помилка при пошуку фільмів', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          // placeholder="Пошук фільмів"
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
