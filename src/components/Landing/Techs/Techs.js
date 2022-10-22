import "./Techs.css";
import SectionHeader from "../../SectionHeader/SectionHeader";
function Techs() {
  return (
    <section id="t2" className="techs">
    <SectionHeader>Технологии</SectionHeader>
      <div className="techs__container">
        <h3 className="techs__header">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__element">HTML</li>
          <li className="techs__element">CSS</li>
          <li className="techs__element">JS</li>
          <li className="techs__element">React</li>
          <li className="techs__element">Git</li>
          <li className="techs__element">Express</li>
          <li className="techs__element">MongoDB</li>
        </ul>
      </div>
    </section>
  );
}
export default Techs;
