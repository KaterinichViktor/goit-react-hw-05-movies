// TrendingMovies.js
import React, { useState, useEffect } from 'react';
import api from './API';
import { Link } from 'react-router-dom';

function TrendingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await api.get('/trending/movie/day');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Помилка при отриманні популярних фільмів', error);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul className='trending-list'>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendingMovies;
