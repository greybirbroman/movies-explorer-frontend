import React, { useState} from "react";
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
      title="Убрать из Сохраненных"
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

  const [description, setDescription] = useState(false);

  const flipClass = `flip-cards ${description ? "flip-cards_active" : ""}`;

  const handleClick = () => {
    if (!description) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  return (
    <li className="movie">
      <div className="movie__container">
        <h3 className="movie__title">{nameRU}</h3>
        <div className="movie__header">
          {/* <button type="button" className="movie__btn_trailer"></button> */}
          <button
            type="button"
            className="movie__btn_description"
            onClick={handleClick}
          >
            {!description ? "Описание" : "Постер"}
          </button>
          <span className="movie__duration">
            {getMovieDuration(movieCard.duration)}
          </span>
          <span className="movie__country">
            {movieCard.country === "Unknown"
              ? "Cтрана неизвестна"
              : movieCard.country}
          </span>
        </div>
        {isMoviesPage ? (
          isSavedMovies(movieCard) ? (
            <button
              className="movie__btn movie__btn_type_active"
              onClick={UnlikeOrDelete}
              type="button"
              title="Убрать из Сохраненных"
            />
          ) : (
            <button
              className="movie__btn"
              onClick={like}
              type="button"
              title="Добавить в Сохраненные"
            />
          )
        ) : (
          <DeleteButton onDelete={UnlikeOrDelete} movieCard={movieCard} />
        )}
      </div>

      <div className={flipClass}>
        <Link
          className="flip-card_front movie__link"
          to={{ pathname: `${trailer}` }}
          target="_blank"
          rel="noreferrer"
          title="Посмотреть трейлер"
        >
          <img src={image} className="movie__image" alt={nameRU} />
        </Link>
        <div className="flip-card_back movie__description-box">
          <span className="movie__span movie__description">{`Режисер: ${movieCard.director}, ${movieCard.year}`}</span>
          <span className="movie__span movie__description">{`Страна: ${movieCard.country}`}</span>
          <span className="movie__description">{movieCard.description}</span>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
