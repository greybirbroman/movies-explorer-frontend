import "./AboutProject.css";
import SectionHeader from "../../SectionHeader/SectionHeader";
function AboutProject() {
  return (
    <section id="t1"className="project">
      <SectionHeader>О проекте</SectionHeader>
      <ul className="brief">
        <li className="brief__column">
          <h4 className="brief__title">Дипломный проект включал 5 этапов</h4>
          <p className="brief__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="brief__column">
          <h4 className="brief__title">На выполнение диплома ушло 5 недель</h4>
          <p className="brief__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="scale">
        <p className="scale__text scale__chart scale__chart_green">1 неделя</p>
        <p className="scale__text scale__chart scale__chart_gray">4 недели</p>
        <p className="scale__text scale__item">Back-end</p>
        <p className="scale__text scale__item">Front-end</p>
      </div>
    </section>
  );
}
export default AboutProject;
