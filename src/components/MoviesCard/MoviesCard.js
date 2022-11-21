import React from "react";
import { Link } from "react-router-dom";
import "./MoviesCard.css";

function DeleteButton({ onDelete, movieCard }) {
  const handleDelete = () => {
    onDelete(movieCard);
  };

  return (
    <button
      className="movie__btn movie__btn_type_delete"
      onClick={handleDelete}
      type="button"
    />
  );
}

function MoviesCard({
  movieCard,
  nameRU,
  trailer,
  image,
  onLike,
  onUnlike,
  isMoviesPage,
  isSavedMovies,
}) {
  const getMovieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const hoursStr = hours > 0 ? `${hours}ч ` : "";
    const minutes = duration - hours * 60;
    const minutesStr = minutes > 0 ? `${minutes}м` : "";
    return hoursStr + minutesStr;
  };

  const UnlikeOrDelete = () => {
    onUnlike(movieCard);
  };

  const like = () => {
    onLike(movieCard);
  };

  return (
    <li className="movie">
      <div className="movie__container">
        <div className="movie__header">
          <h3 className="movie__title">{nameRU}</h3>
          <span className="movie__direction">
            {getMovieDuration(movieCard.duration)}
          </span>
        </div>
        {isMoviesPage ?
            (isSavedMovies(movieCard) ?
               <button className='movie__btn movie__btn_type_active' onClick={UnlikeOrDelete} type="button" />
               :
               <button className='movie__btn' onClick={like} type='button' />)
            :
            <DeleteButton onDelete={UnlikeOrDelete} movieCard={movieCard}/>}
      </div>
      <div className="movie__image-box">
        <Link to={{ pathname: `${trailer}` }} target="_blank">
          <img
            src={image}
            className="movie__image"
            alt={nameRU}
            title="Посмотреть трейлер"
          />
        </Link>
      </div>
    </li>
  );
}

export default MoviesCard;
