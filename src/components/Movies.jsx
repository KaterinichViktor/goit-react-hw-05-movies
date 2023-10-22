import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchMovies from './SearchMovies';

function Movies() {
  const [searchResults, setSearchResults] = useState([]);
  const currentLocation = useLocation();

  const handleSearchResults = (results) => {
    setSearchResults(results);
  }

  return (
    <div>
      <SearchMovies onSearchResults={handleSearchResults} />
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: currentLocation }}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
