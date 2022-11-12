import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ButtonElse from "../ButtonElse/ButtonElse";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";

function SavedMovies({
  onSearch,
  onToggleSwitchClick,
  savedIsChecked,
  movies,
  isLoading,
  onUnlike,
  savedMovies,
  showMoreResults,
  moreResults,
  loggedIn,
  shortMoviesOn,
  errorMessage,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />

      <main className="saved-movies">
        <SearchForm
          onSavedMoviesSearch={onSearch}
          onToggleSwitchClick={onToggleSwitchClick}
          savedIsChecked={savedIsChecked}
          shortMoviesOn={shortMoviesOn}
        />
        <Loader isLoading={isLoading} />
        <MoviesCardList
          savedMovies={savedMovies}
          movies={movies}
          button="movie__btn_type_delete"
          onUnlike={onUnlike}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        {moreResults ? (
          <ButtonElse onClick={showMoreResults} aria-label="Показать ещё" />
        ) : (
          <React.Fragment />
        )}
      </main>
      {!isLoading ? <Footer /> : null}
    </>
  );
}
export default SavedMovies;
