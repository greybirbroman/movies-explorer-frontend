import React from "react";
import "./NotFound.css";

function NotFound({ history }) {
  const handleClick = () => {
    history.goBack();
  };

  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title page-not-found-container">404</h1>
      <p className="page-not-found__subtitle page-not-found-container">
        Страница не найдена
      </p>
      <button  type='button' className="page-not-found__btn" onClick={handleClick}>
        Назад
      </button>
    </section>
  );
}
export default NotFound;
