import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <article className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </article>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__list">
          <li className="footer__links">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links">
            <a
              className="footer__link"
              href="https://github.com/greybirbroman"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
