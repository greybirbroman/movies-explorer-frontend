import "./AboutMe.css";
import photo from "../../../images/avatar.jpg";
import SectionHeader from "../../SectionHeader/SectionHeader";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section id="t3" className="aboutme">
      <SectionHeader>Студент</SectionHeader>
      <div className="aboutme__container">
        <div className="aboutme__info">
          <h3 className="aboutme__name">Роман</h3>
          <p className="aboutme__job">Фронтенд-разработчик, 31 год</p>

          <p className="aboutme__description">
            Привет! Я&nbsp;живу в&nbsp;Санкт-Петербурге, закончил юридический
            факультет СПБГЭУ в&nbsp;2014&nbsp;году. Люблю и&nbsp;умею готовить
            интересные рецепты, много знаю про &laquo;спешалти&raquo; кофе,
            нравится и&nbsp;хочется бегать больше, люблю автомобили. Сегодня
            я&nbsp;очень хочу стать программистом, поэтому стал учиться
            и&nbsp;прошел программу &laquo;WEB-разработчик&raquo;
            в&nbsp;Yandex.Практикум. Сфера IT&nbsp;всегда привлекала меня тем,
            что она может вступать в симбиоз с&nbsp;любым бизнессом
            и&nbsp;делать его лучше, влиять на&nbsp;качество конечного продукта
            и&nbsp;жизни людей. Я&nbsp;очень мотивирован и&nbsp;готов к
            постояному изучению нового. Хочу приносить пользу, решать разные
            задачи, заниматься реальными проектами и&nbsp;состояться как
            специалист в&nbsp;этой области.
          </p>

          <ul className="aboutme__list">
            <li className="aboutme__item">
              <a
                className="aboutme__link"
                href="https://github.com/greybirbroman"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className="aboutme__photo"
          src={photo}
          alt="Моя фотография"
          title="Это я"
        />
      </div>
      <Portfolio />
    </section>
  );
}
export default AboutMe;
