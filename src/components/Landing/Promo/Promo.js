import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <ul className="promo__list">
          <li className="promo__element">
            <a href="#t1" className="promo__link">
              О проекте
            </a>
          </li>
          <li className="promo__element">
            <a href="#t2" className="promo__link">
              Технологии
            </a>
          </li>
          <li className="promo__element">
            <a href="#t3" className="promo__link">
              Студент
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
export default Promo;
