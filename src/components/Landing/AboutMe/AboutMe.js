import "./AboutMe.css";
import photo from "../../../images/avatar.jpeg";
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
            Привет! Я живу в Санкт-Петербурге, закончил юридический факультет
            СПБГЭУ в 2014 году. Теперь я очень хочу сменить сферу деятельности,
            поэтому пошел учиться в Yandex. Я люблю и умею готовить интересные рецепты,
            увлекаюсь "спешалти" кофе, бегом и автомобилями. Вместо попугая будет фото.
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
        <img className="aboutme__photo" src={photo} alt="Моя фотография" />
      </div>
      <Portfolio />
    </section>
  );
}
export default AboutMe;
