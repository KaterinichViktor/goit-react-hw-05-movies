import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchMovies from './SearchMovies';

function Movies() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  }

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <SearchMovies onSearchResults={handleSearchResults} />
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
