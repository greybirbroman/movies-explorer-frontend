import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

function Profile() {
  return (
    <section className="profile">
      <Header>
        <Navigation />
      </Header>
      <form className="profile__form">
        <h2 className="profile__title">Привет, Роман</h2>
        <fieldset className="profile__fields">
          <label className="profile__label">Имя</label>
          <input className="profile__input"></input>
        </fieldset>
        <div className="profile__input-line"></div>
        <fieldset className="profile__fields">
          <label className="profile__label">E-mail</label>
          <input className="profile__input"></input>
        </fieldset>
        <fieldset className="profile__buttons">
          <button type="submit" className="profile__btn profile__btn_type_edit">
            Редактировать
          </button>
          <button className="profile__btn profile__btn_type_exit">
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;

