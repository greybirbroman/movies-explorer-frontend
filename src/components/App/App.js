import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import NavTab from "../NavTab/NavTab";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Landing from "../Landing/Landing.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path='/not-found'>
          <NotFound />
        </Route>
        <Route path="/">
          <Header>
            <NavTab />
          </Header>
          <Landing />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
