import "./ButtonElse.css";

function ButtonElse({ onClick, moreResults }) {
  return (
    <section className="button">
      <button type='button' className={`button__else ${moreResults ? 'button__else_active' : null}`} onClick={onClick}>
        Ещё
      </button>
    </section>
  );
}

export default ButtonElse;
