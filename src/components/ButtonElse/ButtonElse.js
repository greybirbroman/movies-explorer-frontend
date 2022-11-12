import "./ButtonElse.css";

function ButtonElse({ onClick }) {
  return (
    <section className="button">
      <button type='button' className="button__else" onClick={onClick}>
        Ещё
      </button>
    </section>
  );
}

export default ButtonElse;
