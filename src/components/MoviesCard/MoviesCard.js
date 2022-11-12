import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const getMovieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const hoursStr = hours > 0 ? `${hours}ч ` : "";
    const minutes = duration - hours * 60;
    const minutesStr = minutes > 0 ? `${minutes}м` : "";
    return hoursStr + minutesStr;
  };

  const location = useLocation();
  const thisMovie = props.movieCard;
  const savedMovies = props.savedMovies;

  const [isLiked, setIsLiked] = useState(false);

  const unLike = () => {
    setIsLiked(false);
    props.onUnlike(thisMovie);
  };

  const like = () => {
    setIsLiked(true);
    props.onLike(thisMovie);
  };

  function handleClick() {
    isLiked ? unLike() : like();
  }

  const likeCheck = () => {
    if (savedMovies) {
      if (!isLiked) {
        const someCard = savedMovies.find(
          (likedMovie) => likedMovie.movieId === thisMovie.id
        );
        if (someCard) setIsLiked(true);
        setIsLiked(false);
      }
    }
  };

  useEffect(() => {
    location.pathname === "/movies" ? likeCheck() : setIsLiked(true);
  }, []);

  const buttonClass = `movie__btn ${isLiked ? `${props.button}` : ""}`;

  return (
    <li className="movie">
      <div className="movie__container">
        <div className="movie__header">
          <h3 className="movie__title">{props.nameRU}</h3>
          <span className="movie__direction">
            {getMovieDuration(thisMovie.duration)}
          </span>
        </div>
        <button type="button" className={buttonClass} onClick={handleClick} />
      </div>
      <div className="movie__image-box">
        <Link to={{ pathname: `${props.trailer}` }} target="_blank">
          <img
            src={props.image}
            className="movie__image"
            alt={props.nameRU}
            title="Посмотреть трейлер"
          />
        </Link>
      </div>
    </li>
  );
}

export default MoviesCard;
