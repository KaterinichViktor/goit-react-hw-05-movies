import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header>
      <NavLink to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/movies" activeClassName="active">Movies</NavLink>
    </header>
  );
}


export default Header;
