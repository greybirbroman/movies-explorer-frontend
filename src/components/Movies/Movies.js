import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ButtonElse from "../ButtonElse/ButtonElse";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";

function Movies({
  onSearch,
  onToggleSwitchClick,
  isChecked,
  movies,
  isLoading,
  onLike,
  onUnlike,
  savedMovies,
  errorMessage,
  showMoreResults,
  moreResults,
  lastSearchWord,
  loggedIn,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />

      <main className="movies">
        <SearchForm
          onSearch={onSearch}
          onToggleSwitchClick={onToggleSwitchClick}
          isChecked={isChecked}
          lastSearchWord={lastSearchWord}
        />
        <Loader isLoading={isLoading} />
        <MoviesCardList
          savedMovies={savedMovies}
          movies={movies}
          onLike={onLike}
          onUnlike={onUnlike}
          button="movie__btn_type_active"
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        {moreResults && !isLoading ? (
          <ButtonElse onClick={showMoreResults} />
        ) : (
          <React.Fragment />
        )}
      </main>
      {!isLoading ? <Footer /> : null}
    </>
  );
}
export default Movies;
