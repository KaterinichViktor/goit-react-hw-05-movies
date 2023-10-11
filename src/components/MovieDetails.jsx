import React, { useState, useEffect } from 'react';
import { useParams, Link, Routes, Route } from 'react-router-dom';
import api from './API';
import Cast from './Cast';
import Reviews from './Reviews';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isCastOpen, setIsCastOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = await api.get(`/movie/${movieId}`);
        setMovie(movieResponse.data);
      } catch (error) {
        console.error('Помилка при отриманні деталей фільму', error);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <Link to="/">Назад</Link>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>Оцінка користувачів: {movie.vote_average}</p>
      <p>Огляд: {movie.overview}</p>
      <p>Жанри: {movie.genres?.map((genre) => genre.name).join(', ')}</p>

      <nav>
        <Link to="cast">Переглянути акторський склад</Link>
        <Link to="reviews">Переглянути огляди</Link>
      </nav>

      <Routes>
        <Route
          path="cast"
          element={<Cast />}
          end={() => setIsCastOpen(true)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          end={() => setIsReviewsOpen(true)}
        />
      </Routes>

      {isCastOpen && <Cast />}
      {isReviewsOpen && <Reviews />}
    </div>
  );
}

export default MovieDetails;
