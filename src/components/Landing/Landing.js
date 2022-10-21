import "./Landing.css";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";

function Landing() {
  return (
    <div className="landing">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </div>
  );
}
export default Landing;
