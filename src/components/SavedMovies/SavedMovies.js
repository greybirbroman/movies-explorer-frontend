import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

function SavedMovies() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <SearchForm />
      <MoviesCardList />
    </>
  );
}

export default SavedMovies;
