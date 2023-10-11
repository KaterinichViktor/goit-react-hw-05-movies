import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
    </nav>
  );
}

export default Header;
