import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Like from "./common/like";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup"
import { paginate } from "../utils/paginate";

class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
   }

   componentDidMount = () => {
      this.setState({
         movies: getMovies(),
         genres: getGenres()
      });
   }

   handleDelete = (movie) => {
      const movies = this.state.movies.filter(m => m._id !== movie._id);
      this.setState({ movies: movies });
      this.state.movies = movies;
      this.handlePageChange(this.state.currentPage);
   }

   handleLike = (movie) => {
      movie.liked = !movie.liked;
      this.setState({ movies: this.state.movies });
   }

   handlePageChange = (page) => {
      const pagesCount = Math.ceil(this.state.movies.length / this.state.pageSize);
      let currentPage = Math.min(Math.max(page, 1), pagesCount);
      this.setState({ currentPage });
   }

   handleGenreSelect = (genre) => {
      console.log(genre);
   }

   render() {
      const { length: count } = this.state.movies;
      const { pageSize, currentPage, movies } = this.state;
      if (count === 0) return <p>There are no movies in the database.</p>;
      const paginatedMovies = paginate(movies, currentPage, pageSize);
      return (
         <div className="row">
            <div className="col-3">
               <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} />
            </div>
            <div className="col">
               <p>Showing {paginatedMovies.length} movies in the database.</p>
               <table className="table table-striped">
                  <thead className="thead-dark">
                     <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th />
                        <th />
                     </tr>
                  </thead>
                  <tbody>
                     {paginatedMovies.map(movie => (
                        <tr key={movie._id}>
                           <td>{movie.title}</td>
                           <td>{movie.genre.name}</td>
                           <td>{movie.numberInStock}</td>
                           <td>{movie.dailyRentalRate}</td>
                           <td><Like liked={movie.liked} onClick={() => { this.handleLike(movie) }} /></td>
                           <td><button onClick={() => this.handleDelete(movie)} className="btn btn-warning btn-sm">Delete</button></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </div>
         </div>
      );
   }
}

export default Movies;
