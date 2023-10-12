import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom'; // Added useNavigate, Routes, Route, and Outlet
import api from './API';
import Cast from './Cast';
import Reviews from './Reviews';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isCastOpen, setIsCastOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate(); // Added useNavigate

  const userScorePercentage = movie.vote_average * 10;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = await api.get(`/movie/${movieId}`);
        setMovie(movieResponse.data);
      } catch (error) {
        console.error('Помилка при отриманні деталей фільму', error);
      }
    }

    async function fetchReviews() {
      try {
        const reviewsResponse = await api.get(`/movie/${movieId}/reviews`);
        setReviews(reviewsResponse.data.results);
      } catch (error) {
        console.error('Помилка при отриманні оглядів', error);
      }
    }

    fetchMovieDetails();
    fetchReviews();
  }, [movieId]);

// Function to toggle the Cast section
const toggleCast = () => {
  if (isReviewsOpen) {
    // Close Reviews if it's open
    setIsReviewsOpen(false);
  }
  // Toggle Cast
  setIsCastOpen(!isCastOpen);
  navigate(`/movies/${movieId}/cast`);
};

// Function to toggle the Reviews section
const toggleReviews = () => {
  if (isCastOpen) {
    // Close Cast if it's open
    setIsCastOpen(false);
  }
  // Toggle Reviews
  setIsReviewsOpen(!isReviewsOpen);
  navigate(`/movies/${movieId}/reviews`);
};


  return (
    <div className='movie-all-info'>
      <button className='go-back'><Link to="/">Go back</Link></button>
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-banner"
        />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>User score: {userScorePercentage}%</p> {/* Display user score as a percentage */}
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <p>{movie.genres?.map((genre) => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className="additional-info">
        <p>Additional information</p>
        <ul>
          <li>
            <button onClick={toggleCast} className='cast-reviews'>Cast</button>
          </li>
          <li>
            <button onClick={toggleReviews} className='cast-reviews'>Reviews</button>
          </li>
        </ul>
      </div>

      {isCastOpen && (
        <div className="section">
          <Cast />
        </div>
      )}

      {isReviewsOpen && (
        <div className="section">
          <Reviews reviews={reviews} />
        </div>
      )}
      <Routes>
        <Route
          path="cast"
          element={<Cast />}
        />
        <Route
          path="reviews"
          element={<Reviews reviews={reviews} />}
        />
      </Routes>
    </div>
  );
}

export default MovieDetails;
