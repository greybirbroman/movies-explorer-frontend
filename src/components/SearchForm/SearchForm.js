import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form name="search-form" className="search__form">
        <fieldset className="search__input-box">
          <input
            type="text"
            id="search-input"
            name="search-input"
            placeholder="Фильм"
            className="search__input"
            required
          ></input>
          <button type="submit" className="search__button"></button>
        </fieldset>
        <fieldset className="search__switch-box search__box">
          <div className="search__line search__box" />
          <FilterCheckbox />
          <p className="search__switch-name search__box">Короткометражки</p>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
