import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from './API';

function SearchMovies() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate(); // Додали змінну для навігації

  const handleSearch = async () => {
    try {
      const response = await api.get('/search/movie', {
        params: { query },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Помилка при пошуку фільмів', error);
    }
  };

  return (
    <div>
      <h2>Пошук фільмів</h2>
      <input
        type="text"
        placeholder="Пошук фільмів"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Пошук</button>
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

export default SearchMovies;
