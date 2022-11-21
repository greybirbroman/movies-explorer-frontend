import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MOVIES_URL } from "../../utils/MoviesApi";


function MoviesCardList(props) {
  const movies = props.movies;

  // Список для /movies

  const getMoviesList = (movies) => {
    if (movies.length > 0) {
      return movies.map((movie) => (
        <MoviesCard
          key={movie.id}
          movieCard={movie}
          image={`${MOVIES_URL}/${movie.image.url}`}
          nameRU={movie.nameRU}
          button={props.button}
          trailer={movie.trailerLink}
          onLike={props.onLike}
          onUnlike={props.onUnlike}
          savedMovies={props.savedMovies}
          isMoviesPage={props.isMoviesPage}
          isSavedMovies={props.isSavedMovies}
        />
      ));
    }
    return (
      <li className="movies__list-no-result-box">
        <p className="movies__list-no-result">{props.errorMessage}</p>
      </li>
    );
  };
// Список для /saved-movies

  const getSavedList = (movies) => {
    if (movies.length > 0) {
      return movies.map((movie) => (
        <MoviesCard
          key={movie._id}
          movieCard={movie}
          image={movie.image}
          nameRU={movie.nameRU}
          button={props.button}
          trailer={movie.trailer}
          onUnlike={props.onUnlike}
          isMoviesPage={props.isMoviesPage}
          isSavedMovies={props.isSavedMovies}
        />
      ));
    }
    return (
      <li className="movies__list-no-result-box">
        <p className="movies__list-no-result">{props.errorMessage}</p>
      </li>
    );
  };

  return (
    <ul className="movies__list">
      {props.isMoviesPage
        ? getMoviesList(movies)
        : getSavedList(movies)}
    </ul>
  );
}
export default MoviesCardList;
