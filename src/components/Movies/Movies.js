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
  isSavedMovies,
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
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <>
            <MoviesCardList
              savedMovies={savedMovies}
              movies={movies}
              onLike={onLike}
              onUnlike={onUnlike}
              isLoading={isLoading}
              errorMessage={errorMessage}
              isMoviesPage={true}
              isSavedMovies={isSavedMovies}
            />
            <>
              {moreResults ? (
                <ButtonElse onClick={showMoreResults} hidden={moreResults} />
              ) : null}
            </>
          </>
        )}
      </main>
      {!isLoading && <Footer />}
    </>
  );
}
export default Movies;
