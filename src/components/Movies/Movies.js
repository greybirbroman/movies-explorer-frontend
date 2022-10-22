import "./Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ButtonElse from "../ButtonElse/ButtonElse";
import Footer from "../Footer/Footer";

function Movies() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <SearchForm />
        <MoviesCardList />
        <ButtonElse />
      </main>
      <Footer />
    </>
  );
}
export default Movies;
