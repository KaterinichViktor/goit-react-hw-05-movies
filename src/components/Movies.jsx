import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchMovies from './SearchMovies';
import api from './API';

function Movies() {
  const currentLocation = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Extract query from the location state
    const query = currentLocation.state?.query;

    // If the query is different from the previous one, update search results
    if (query !== searchQuery) {
      setSearchQuery(query);
      if (query) {
        async function fetchMovies() {
          try {
            const response = await api.get('/search/movie', {
              params: { query },
            });
            setSearchResults(response.data.results);

            // Store the search results in sessionStorage
            sessionStorage.setItem('searchResults', JSON.stringify(response.data.results));
          } catch (error) {
            console.error('Error fetching search results', error);
          }
        }
        fetchMovies();
      }
    }
  }, [currentLocation.state, searchQuery]);

  useEffect(() => {
    // Retrieve search results from sessionStorage when the component mounts
    const storedResults = sessionStorage.getItem('searchResults');
    if (storedResults) {
      setSearchResults(JSON.parse(storedResults));
    }
  }, []);

  return (
    <div>
      <SearchMovies />
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
