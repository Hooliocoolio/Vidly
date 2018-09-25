import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
   render() {
      return (
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">Vidly</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <div className="navbar-nav mr-auto">
                  <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                  <NavLink className="nav-item nav-link" to="/customers">Costomers</NavLink>
                  <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                  <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                  <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
               </div>
            </div>
         </nav>
      );
   }
}