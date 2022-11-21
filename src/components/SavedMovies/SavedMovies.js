import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
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
  loggedIn,
  shortMoviesOn,
  errorMessage,
  isSavedMovies,
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
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <MoviesCardList
            savedMovies={savedMovies}
            movies={movies}
            onUnlike={onUnlike}
            isLoading={isLoading}
            errorMessage={errorMessage}
            isMoviesPage={false}
            isSavedMovies={isSavedMovies}
          />
        )}
      </main>
      {!isLoading ? <Footer /> : null}
    </>
  );
}
export default SavedMovies;
