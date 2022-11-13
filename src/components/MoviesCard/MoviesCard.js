import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({
  movieCard,
  savedMovies,
  button,
  nameRU,
  trailer,
  image,
  onLike,
  onUnlike,
}) {
  const getMovieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const hoursStr = hours > 0 ? `${hours}ч ` : "";
    const minutes = duration - hours * 60;
    const minutesStr = minutes > 0 ? `${minutes}м` : "";
    return hoursStr + minutesStr;
  };

  const location = useLocation();

  const [isLiked, setIsLiked] = useState(false);

  const buttonClass = `movie__btn ${isLiked ? `${button}` : ""}`;

  const unLike = () => {
    setIsLiked(false);
    onUnlike(movieCard);
  };

  const like = () => {
    setIsLiked(true);
    onLike(movieCard);
  };

  const likeCheck = () => {
    if (savedMovies) {
      if (!isLiked) {
        const someCard = savedMovies.some(
          (likedMovie) => likedMovie.movieId === movieCard.id
        );
        if (someCard) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    }
  };

  function handleClick() {
    isLiked ? unLike() : like();
  }

  useEffect(() => {
    location.pathname === "/movies" ? likeCheck() : setIsLiked(true);
  }, []);

  return (
    <li className="movie">
      <div className="movie__container">
        <div className="movie__header">
          <h3 className="movie__title">{nameRU}</h3>
          <span className="movie__direction">
            {getMovieDuration(movieCard.duration)}
          </span>
        </div>
        <button type="button" className={buttonClass} onClick={handleClick} />
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
