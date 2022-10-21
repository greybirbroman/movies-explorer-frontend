import "./MoviesCard.css";
import movie_pic from "../../images/movie-pic.png";

function MoviesCard() {
  return (
    <>
      <li className="movie">
        <div className="movie__container">
          <div className="movie__header">
            <h3 className="movie__title">33 слова о дизайне</h3>
            <span className="movie__direction">1ч 47м</span>
          </div>
          <div className="movie__btn"></div>
        </div>

        <img
          src={movie_pic}
          className="movie__image"
          alt="Картинка из фильма"
        />
      </li>
      <li className="movie">
        <div className="movie__container">
          <div className="movie__header">
            <h3 className="movie__title">33 слова о дизайне</h3>
            <span className="movie__direction">1ч 47м</span>
          </div>
          <div className="movie__btn"></div>
        </div>

        <img
          src={movie_pic}
          className="movie__image"
          alt="Картинка из фильма"
        />
      </li>
      <li className="movie">
        <div className="movie__container">
          <div className="movie__header">
            <h3 className="movie__title">33 слова о дизайне</h3>
            <span className="movie__direction">1ч 47м</span>
          </div>
          <div className="movie__btn"></div>
        </div>

        <img
          src={movie_pic}
          className="movie__image"
          alt="Картинка из фильма"
        />
      </li>
      <li className="movie">
        <div className="movie__container">
          <div className="movie__header">
            <h3 className="movie__title">33 слова о дизайне</h3>
            <span className="movie__direction">1ч 47м</span>
          </div>
          <div className="movie__btn"></div>
        </div>

        <img
          src={movie_pic}
          className="movie__image"
          alt="Картинка из фильма"
        />
      </li>
      <li className="movie">
        <div className="movie__container">
          <div className="movie__header">
            <h3 className="movie__title">33 слова о дизайне</h3>
            <span className="movie__direction">1ч 47м</span>
          </div>
          <div className="movie__btn"></div>
        </div>

        <img
          src={movie_pic}
          className="movie__image"
          alt="Картинка из фильма"
        />
      </li>
      <li className="movie">
        <div className="movie__container">
          <div className="movie__header">
            <h3 className="movie__title">33 слова о дизайне</h3>
            <span className="movie__direction">1ч 47м</span>
          </div>
          <button className="movie__btn"></button>
        </div>

        <img
          src={movie_pic}
          className="movie__image"
          alt="Картинка из фильма"
        />
      </li>
    </>
  );
}

export default MoviesCard;
