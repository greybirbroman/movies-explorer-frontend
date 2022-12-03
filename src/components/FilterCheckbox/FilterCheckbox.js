import "./FilterCheckbox.css";

function FilterCheckbox({ isDisabled, isChecked, onChange }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__input"
        checked={isChecked}
        disabled={isDisabled}
        onChange={onChange}
      />
      <span className="switch__slider" />
    </label>
  );
}
export default FilterCheckbox;
