import "./Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ButtonElse from "../ButtonElse/ButtonElse";

function Movies() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <SearchForm />
      <MoviesCardList />
      <ButtonElse />
    </>
  );
}
export default Movies;
