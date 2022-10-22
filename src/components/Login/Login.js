import "./Login.css";
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import SubmitGroup from "../SubmitGroup/SubmitGroup";

function Login() {
  return (
    <section className="login">
      <header className="login__header">
        <Logo />
      </header>
      <Form title={"Рады видеть!"} name={"regForm"}>
        <fieldset className="login__fields">
          <label className="login__label">E-mail</label>
          <input type="email" className="login__input"></input>
        </fieldset>
        <div className="login__input-line"></div>
        <fieldset className="login__fields">
          <label className="login__label">Пароль</label>
          <input type="password" className="login__input"></input>
        </fieldset>
        <div className="login__input-line"></div>
      <SubmitGroup
        submitName={"Войти"}
        linkName={"Регистрация"}
        linkDestination={"/signup"}
      >
        Еще не зарегестированы?&ensp;
      </SubmitGroup>
      </Form>
    </section>
  );
}
export default Login;
