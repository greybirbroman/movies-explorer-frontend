import React from "react";
import "./Form.css";

const Form = ({ name, title, children, onSubmit }) => (
  <form className="form" name={name} onSubmit={onSubmit}>
    <h2 className="form__title">{title}</h2>
    {children}
  </form>
);

export default Form;
