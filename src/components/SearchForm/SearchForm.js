import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useLocation } from "react-router-dom";


function SearchForm({
  onSearch,
  lastSearchWord,
  onSavedMoviesSearch,
  onToggleSwitchClick,
  isChecked,
  savedIsChecked,
}) {
  const [searchWord, setSearchWord] = useState(lastSearchWord);

  const location = useLocation();

  const handleStringChange = (evt) => {
    setSearchWord(evt.target.value);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    location.pathname === "/movies"
      ? onSearch(searchWord)
      : onSavedMoviesSearch(searchWord);
  };

  return (
    <section className="search">
      <form
        name="search-form"
        className="search__form"
        onSubmit={handleSearch}
        noValidate
      >
        <fieldset className="search__input-box">
          <input
            type="text"
            id="search-input"
            name="search-input"
            placeholder="Фильм"
            value={searchWord || ""}
            onChange={handleStringChange}
            className="search__input search__box"
            required
          ></input>
          <button
            type="submit"
            // className={`search__button ${
            //   !searchWord ? "search__button_disabled" : ""
            // }`}
            className="search__button"
            onClick={handleSearch}
            // disabled={!searchWord}
          ></button>
        </fieldset>
        <fieldset className="search__switch-box search__box">
          <div className="search__line search__box" />
          <label className="switch">
            <FilterCheckbox
              isChecked={
                location.pathname === "/movies"
                  ? isChecked || false
                  : savedIsChecked || false
              }
              onChange={onToggleSwitchClick}
              // isDisabled={!searchWord}
            />
          </label>
          <p className="search__switch-name search__box">Короткометражки</p>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
