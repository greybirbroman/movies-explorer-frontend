import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <a
            className="portfolio__link"
            target="_blank"
            href="https://github.com/greybirbroman/how-to-learn"
            rel="noreferrer noopener"
          >
            Статичный сайт
          </a>
          <a
            className="portfolio__link-img"
            target="_blank"
            href="https://github.com/greybirbroman/how-to-learn"
            rel="noreferrer noopener"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__element">
          <a
            className="portfolio__link"
            target="_blank"
            href="https://github.com/greybirbroman/russian-travel"
            rel="noreferrer noopener"
          >
            Адаптивный сайт
          </a>
          <a
            className="portfolio__link-img"
            target="_blank"
            href="https://github.com/greybirbroman/russian-travel"
            rel="noreferrer noopener"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__element">
          <a
            className="portfolio__link"
            target="_blank"
            href="https://github.com/greybirbroman/mesto"
            rel="noreferrer noopener"
          >
            Одностраничное приложение
          </a>
          <a
            className="portfolio__link-img"
            target="_blank"
            href="https://github.com/greybirbroman/mesto"
            rel="noreferrer noopener"
          >
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
