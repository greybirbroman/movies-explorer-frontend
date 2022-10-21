import "./Landing.css";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";

function Landing() {
  return (
    <div className="landing">
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
    </div>
  );
}
export default Landing;
