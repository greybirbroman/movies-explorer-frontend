import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <Link
            to={{ pathname: `https://github.com/greybirbroman/how-to-learn` }}
            className="portfolio__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            Статичный сайт
          </Link>
        </li>
        <li className="portfolio__element">
          <Link
            to={{ pathname: `https://github.com/greybirbroman/russian-travel` }}
            className="portfolio__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            Адаптивный сайт
          </Link>
        </li>
        <li className="portfolio__element">
          <Link
            to={{ pathname: `https://github.com/greybirbroman/mesto` }}
            className="portfolio__link"
            target="_blank"
            rel="noreferrer noopener"
          >
            Одностраничное приложение
          </Link>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
