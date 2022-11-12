import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { MOVIES_URL } from "../../utils/MoviesApi";
import Loader from "../Loader/Loader";

function MoviesCardList(props) {
  const movies = props.movies;
  const location = useLocation();


  // При разных условиях отрисовываем разные фильмы

  const getMoviesList = (movies) => {
    if (location.pathname === "/movies" && movies.length > 0) {
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
        />
      ));
    }
    if (location.pathname === "/saved-movies" && movies.length > 0) {
      return movies.map((movie) => (
        <MoviesCard
          key={movie._id}
          movieCard={movie}
          image={movie.image}
          nameRU={movie.nameRU}
          button={props.button}
          trailer={movie.trailer}
          onUnlike={props.onUnlike}
        />
      ));
    }
    return (
      <li className="movies__list-no-result-box">
        <p className="movies__list-no-result">{props.errorMessage}</p>
      </li>
    );
  };

  // Пока грузится страница показываем Прелоадер
  return (
    <ul className="movies__list">
      {props.isLoading ? <Loader /> : getMoviesList(movies)}
    </ul>
  );
}
export default MoviesCardList;
