import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import SearchMovies from './SearchMovies';
import TrendingMovies from './TrendingMovies';


export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/trending" element={<TrendingMovies />} />

      </Routes>
    </Router>
    </div>
  );
};



