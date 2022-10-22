import "./Register.css";
import Form from "../Form/Form";
import SubmitGroup from "../SubmitGroup/SubmitGroup";
import Logo from "../Logo/Logo";

function Register() {
  return (
    <>
      <section className="register">
        <header className="register__header">
          <Logo />
        </header>
        <Form title={"Добро пожаловать!"}>
          <fieldset className="register__fields">
            <label className="register__label">Имя</label>
            <input className="register__input"></input>
          </fieldset>
          <div className="register__input-line"></div>
          <fieldset className="register__fields">
            <label className="register__label">E-mail</label>
            <input type="email" className="register__input"></input>
          </fieldset>
          <div className="register__input-line"></div>
          <fieldset className="register__fields">
            <label className="register__label">Пароль</label>
            <input type="password" className="register__input"></input>
          </fieldset>
          <div className="register__input-line"></div>
          <SubmitGroup
            submitName={"Зарегестрироваться"}
            linkName={"Войти"}
            linkDestination={"/signin"}
          >
            Уже зарегестрировались?&ensp;
          </SubmitGroup>
        </Form>
      </section>
    </>
  );
}

export default Register;
