import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import * as auth from "../../utils/Auth";
import { mainApi } from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Landing from "../Landing/Landing.js";
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  SEARCH_ERROR_NO_DATA,
  SEARCH_WORD_ERROR,
  SAVE_ERROR,
  DELETE_ERROR,
  SHORT_FILMS,
  WIDTH_450,
  WIDTH_768,
  ADD_5,
  ADD_8,
  ADD_12,
  ADD_2,
  ADD_3,
  NO_SAVED_FILMS,
  SEARCH_ERROR_API,
  NO_SHORTS,
} from "../../utils/Const";

function App() {
  const history = useHistory();
  const location = useLocation();

  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] =
    useState(false);

  const [resultMovies, setResultMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [allLikedMovies, setAllLikedMovies] = useState(likedMovies);
  const [shortIsOn, setShortIsOn] = useState(false); // Короткометражки для Movies
  const [shortMoviesSearch, setShortMoviesSearch] = useState(false);
  const [savedMoviesShortIsOn, setSavedMoviesShortIsOn] = useState(false);
  const [lastSearchWord, setLastSearchWord] = useState(""); // Поисковая строка

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageSavedMovies, setErrorMessageSavedMovies] = useState("");
  const [moreResults, setMoreResults] = useState(false); // ELSE Button

  const [loggedIn, setIsLoggedIn] = useState(false); // AUTHORIZATION
  const [currentUser, setCurrentUser] = useState({}); // USER

  // Установить количество карточек отображаемых на странице
  const [limit, setLimit] = useState(() => {
    if (window.innerWidth <= WIDTH_450) {
      return ADD_5;
    } else if (window.innerWidth <= WIDTH_768) {
      return ADD_8;
    } else if (window.innerWidth > WIDTH_768) {
      return ADD_12;
    }
  });

  // Для Экранов и планшетов добавляем 3 для смартфонов 2
  const [resultsToAdd, setResultsToAdd] = useState(() => {
    if (window.innerWidth <= WIDTH_768) {
      return ADD_2;
    } else if (window.innerWidth > WIDTH_768) {
      return ADD_3;
    }
  });

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () =>
      setTimeout(() => {
        screenSetter();
      }, 1000)
    );
  }, []);

  const screenSetter = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setLimit(windowSizeHandler);
  }, [width]);

  useEffect(() => {
    moviesRender(filteredMovies, limit);
  }, [limit]);

  const windowSizeHandler = () => {
    if (window.innerWidth <= WIDTH_450) {
      setLimit(ADD_5);
      setResultsToAdd(ADD_2);
    } else if (window.innerWidth <= WIDTH_768) {
      setLimit(ADD_8);
      setResultsToAdd(ADD_2);
    } else if (window.innerWidth > WIDTH_768) {
      setLimit(ADD_12);
      setResultsToAdd(ADD_3);
    }
  };

  function handleLogin(email, password) {
    let message = "";
    auth
      .authorization(email, password)
      .then((res) => {
        console.log("Token_OK");
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        switch (err) {
          case 400:
            message = "Некорректное значение одного или нескольких полей";
            break;
          case 401:
            message = "Неверно указаны e-mail или пароль";
            break;
          default:
            message = "Что-то пошло не так! Попробуйте ещё раз.";
        }
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setErrorMessage(message);
        setTimeout(() => resetErrorMessage(), 2000);
      });
  }

  function handleLogout() {
    localStorage.clear();
    setFilteredMovies([]);
    setResultMovies([]);
    setLastSearchWord("");
    setCurrentUser({ name: "", email: "" });
    setIsLoggedIn(false);
    setShortIsOn(false);
    setMoreResults(false);
    history.push("/");
    console.log("Вышли из учетной записи");
  }

  function findMovies(movies, searchParams) {
    if(searchParams === undefined) searchParams = ''
    const moviesSearchByKeyword = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchParams.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchParams.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchParams.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchParams.toLowerCase())
      );
      
    });
  
     return moviesSearchByKeyword;
  
}

  function searchShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= SHORT_FILMS);
  }

  //Проверка токена при загрузке страницы

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([user, movies]) => {
          console.log("User", user);
          setCurrentUser(user);
          console.log("UserMovies", movies);
          localStorage.setItem("savedMovies", JSON.stringify(movies));
          setLikedMovies(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) handleLogout();
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          // При перезагрузке страницы проверяем последний запрос и выполняем поиск
          if (localStorage.searchWord) {
            const lastSearchWord = JSON.parse(
              localStorage.getItem("searchWord")
            );
            setLastSearchWord(lastSearchWord);
            handleMoviesSearch(lastSearchWord);
            handleSavedMoviesSearch()
          }
        }
      })
      .catch((err) => {
        console.log(err);
        handleLogout();
      });
  }, []);

  function handleRegister({ name, email, password }) {
    let message = "";
    auth
      .registration({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        console.log("Успешная регистрация");
      })
      .catch((err) => {
        switch (err) {
          case 400:
            message = "Некорректное значение одного или нескольких полей";
            break;
          case 401:
            message = "Неверно указаны e-mail или пароль";
            break;
          case 409:
            message = "Пользователь с таким email уже существует!";
            break;
          default:
            message = "Что-то пошло не так! Попробуйте ещё раз.";
        }
      })
      .finally(() => {
        setErrorMessage(message);
      });
  }

  function handleUpdateProfile(data) {
    let message = "";
    setProfileUpdateMessage("");
    setProfileErrorMessage("");
    mainApi
      .patchUserProfile(data)
      .then(({ data }) => {
        setIsProfileUpdateSuccessful(true);
        setCurrentUser({ name: data.name, email: data.email });
        console.log("Изменили пользователя");
        setProfileUpdateMessage("Данные успешно изменены");
        setTimeout(() => setProfileUpdateMessage(""), 2000);
      })
      .catch((err) => {
        switch (err) {
          case 400:
            message = "Некорректное значение одного или нескольких полей";
            break;
          case 409:
            message = "Пользователь c таким email уже существует.";
            break;
          default:
            message = `Невозможно сохранить данные на сервере. ${err}`;
        }
        setIsProfileUpdateSuccessful(false);
      })
      .finally(() => {
        setProfileErrorMessage(message);
        setTimeout(() => {
          setProfileErrorMessage("");
        }, 2000);
      });
  }

  // -----------------------------------------   Главный поиск фильмов ---------------------------------------- //
  async function handleMoviesSearch(searchParams) {
    let filterResults = [];
    let filterShorts = [];
    localStorage.setItem("searchWord", JSON.stringify(searchParams));
    if (localStorage.getItem("filteredMovies"))
      localStorage.removeItem("filteredMovies");

    if (!localStorage.movies) {
      try {
        const movies = await moviesApi.getAllMovies();
        localStorage.setItem("movies", JSON.stringify(movies));
        filterResults = findMovies(movies, searchParams);

        setLimit(windowSizeHandler);
        if (localStorage.getItem("shortIsOn") === "true") {
          filterShorts = searchShortMovies(filterResults);
          if (filterShorts.length === 0) {
            setErrorMessage(SEARCH_ERROR_NO_DATA);
          } else {
            setFilteredMovies(filterShorts);
            moviesRender(filterResults, limit);
          }
        } else {
          if (filterResults.length === 0) {
            setErrorMessage(SEARCH_ERROR_NO_DATA);
          } else {
            setFilteredMovies(filterResults);
            moviesRender(filterResults, limit);
          }
        }
        localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
        setLastSearchWord(JSON.parse(localStorage.getItem("searchWord")));
      } catch (e) {
        console.error(e);
        setErrorMessage(SEARCH_ERROR_API);
      }
    } else {
      setIsLoading(true);
      //---------- берем фильмы из localStorage
      filterResults = findMovies(
        JSON.parse(localStorage.getItem("movies")),
        searchParams
      );
      setLimit(windowSizeHandler);
      setTimeout(() => setIsLoading(false), 500);
      if (localStorage.getItem("shortIsOn") === "true") {
        filterShorts = searchShortMovies(filterResults);
        if (filterShorts.length === 0) {
          setErrorMessage(SEARCH_ERROR_NO_DATA);
        } else {
          setFilteredMovies(filterShorts);
          moviesRender(filterShorts, limit);
        }
      } else {
        if (filterResults.length === 0) {
          setErrorMessage(SEARCH_ERROR_NO_DATA);
        } else {
          setFilteredMovies(filterResults);
          moviesRender(filterResults, limit);
        }
      }
      localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
      setLastSearchWord(JSON.parse(localStorage.getItem("searchWord")));
    }
  }

  //отрисовка фильмов с условиием короткометражек
  const shortMoviesSwitchClick = () => {
    const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    const shortMovies = searchShortMovies(filteredMovies);
    setShortIsOn(!shortIsOn);
    if (!shortIsOn) {
      if (shortMovies.length === 0) {
        setErrorMessage(SEARCH_ERROR_NO_DATA);
      }
      moviesRender(shortMovies, limit);
    } else {
      moviesRender(filteredMovies, limit);
    }
    localStorage.setItem("shortIsOn", !shortIsOn);
  };

  //effects for /movies
  useEffect(() => {
    const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    const shortMovies = searchShortMovies(filteredMovies);
    setShortIsOn(localStorage.getItem("shortIsOn") === "true");
    if (localStorage.getItem("savedShortsIsOn") === "true") {
      moviesRender(shortMovies, limit);
    } else {
      moviesRender(filteredMovies, limit);
    }
  }, []);

  // -----------------------------------------   Главный поиск Сохраненных Фильмов ---------------------------------------- //
  // const handleSavedMoviesSearch = (searchString) => {
  //   setIsLoading(true);
  //   let filterShorts = [];
  //   let filterResults = [];

  //   //const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  //   filterResults = findMovies(allLikedMovies, searchString);
  //   if (localStorage.getItem("savedShortsIsOn") === "true") {
  //     filterShorts = searchShortMovies(filterResults);
  //     if (filterShorts.length === 0) {
  //       setErrorMessageSavedMovies(SEARCH_ERROR_NO_DATA);
  //     }
  //     setAllLikedMovies(filterShorts);
  //   } else {
  //     setAllLikedMovies(filterResults);
  //   }
    
  //   //localStorage.setItem("savedMovies", JSON.stringify(filterResults));
  //   setTimeout(() => setIsLoading(false), 500);
  // };

  const handleSavedMoviesSearch = (searchParams) => {
    setIsLoading(true);
    let filterShorts;
    let filterResults;
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    filterResults = findMovies(savedMovies, searchParams)
    filterShorts = searchShortMovies(filterResults);
    if (localStorage.getItem("savedShortsIsOn") === "true") {
      if (filterShorts.length === 0) {
        setErrorMessageSavedMovies(SEARCH_ERROR_NO_DATA)
      } else {
        setAllLikedMovies(filterShorts)
        localStorage.setItem("resultMovies", JSON.stringify(filterShorts))
      }
    } else {
      if(filterResults.length === 0) {
        setErrorMessageSavedMovies(SEARCH_ERROR_NO_DATA)
      } else {
        setAllLikedMovies(filterResults)
        localStorage.setItem("resultMovies", JSON.stringify(filterResults))
      }
    }
    setTimeout(() => setIsLoading(false), 500)
}


  //отрисовка сохраненных фильмов с фильтром короткометражек
  const shortSavedMoviesSwitchClick = () => {
    const movies = JSON.parse(localStorage.getItem("resultMovies"));
    const savedShortMovies = searchShortMovies(movies);
    setSavedMoviesShortIsOn(!savedMoviesShortIsOn);
    if (!savedMoviesShortIsOn) {
      if (savedShortMovies.length === 0) {
        setErrorMessageSavedMovies(SEARCH_ERROR_NO_DATA);
      }
      setAllLikedMovies(savedShortMovies);
    } else {
      setAllLikedMovies(movies);
    }
    localStorage.setItem("savedShortsIsOn", !savedMoviesShortIsOn);
  };

  // effects for /saved-movies
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const savedShortMovies = searchShortMovies(savedMovies);
    //setAllLikedMovies(savedMovies);
    if (localStorage.getItem("savedShortsIsOn") === "true") {
      setSavedMoviesShortIsOn(true);
      setAllLikedMovies(savedShortMovies);
    } else {
      setSavedMoviesShortIsOn(false);
      setAllLikedMovies(savedMovies);
    }
  }, []);

  // Проверяем массив перед Рендером карточек
  const moviesRender = (movies, itemsToRender) => {
    if (movies) {
      if (movies.length > itemsToRender) {
        setMoreResults(true);
        setResultMovies(movies.slice(0, limit));
      } else {
        setResultMovies(movies);
        setMoreResults(false);
      }
    }
  };

  // useEffect(() => {
  //   if(likedMovies.length > 0) {
  //     setAllLikedMovies(likedMovies)
  //     setSavedMoviesShortIsOn(false);
  //   } else {
  //     setErrorMessageSavedMovies(NO_SAVED_FILMS)
  //   }
  // }, [location.pathname === '/saved-movies'])

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      if (likedMovies.length !== 0) {
        setAllLikedMovies(likedMovies);
        setSavedMoviesShortIsOn(false);
      }
    }
  }, [location]);

  // Правила для кнопки ELSE
  const showMore = () => {
    let newLimit;
    const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    if (limit + resultsToAdd < filteredMovies.length) {
      newLimit = limit + resultsToAdd;
      moviesRender(filteredMovies.slice(0, newLimit));
      setLimit(newLimit);
      setMoreResults(true);
    } else if (limit + resultsToAdd >= filteredMovies.length) {
      newLimit = filteredMovies.length;
      moviesRender(filteredMovies, newLimit);
      setMoreResults(false);
    }
  };

  // Сохранить фильм в избранное и отправить его на сервер
  const saveMovie = (cardMovie) => {
    mainApi
      .postNewMovie(cardMovie)
      .then((savedCard) => {
        console.log("сохранено", savedCard);
        const updatedLikedMovies = [savedCard, ...likedMovies];
        setLikedMovies(updatedLikedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(SAVE_ERROR);
        setTimeout(() => resetErrorMessage(), 1000);
      });
  };

  const isSavedMovies = (movie) => {
    return likedMovies.some(
      (card) => card.movieId === movie.id && card.owner === currentUser._id
    );
  };

  // Удаляем фильм из стейта и с сервера
  function deleteMovie(movie) {
    const deleteCard = likedMovies.find(
      (card) =>
        card.movieId === (movie.id || movie.movieId) &&
        card.owner === currentUser._id
    );
    if (!deleteCard) return;
    mainApi
      .deleteMovie(deleteCard._id)
      .then(() => {
        console.log("удалено", deleteCard);
        const updatedList = likedMovies.filter(
          (currentCard) => currentCard._id !== deleteCard._id
        );
        setLikedMovies(updatedList);
        localStorage.setItem("savedMovies", JSON.stringify(updatedList));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(DELETE_ERROR);
        setTimeout(() => resetErrorMessage(), 1000);
      });
  }

  const resetErrorMessage = () => {
    setErrorMessage("");
    setErrorMessageSavedMovies("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing loggedIn={loggedIn} />
          </Route>

          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            movies={resultMovies}
            onSearch={handleMoviesSearch}
            onLike={saveMovie}
            onUnlike={deleteMovie}
            isLoading={isLoading}
            moreResults={moreResults}
            showMoreResults={showMore}
            savedMovies={likedMovies}
            onToggleSwitchClick={shortMoviesSwitchClick}
            isChecked={shortIsOn}
            lastSearchWord={lastSearchWord}
            errorMessage={errorMessage}
            isSavedMovies={isSavedMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            movies={allLikedMovies}
            onSearch={handleSavedMoviesSearch}
            onUnlike={deleteMovie}
            isLoading={isLoading}
            loggedIn={loggedIn}
            savedMovies={likedMovies}
            shortMoviesOn={shortMoviesSearch}
            onToggleSwitchClick={shortSavedMoviesSwitchClick}
            savedIsChecked={savedMoviesShortIsOn}
            errorMessage={errorMessageSavedMovies}
            isSavedMovies={isSavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateProfile}
            profileUpdateMessage={profileUpdateMessage}
            profileErrorMessage={profileErrorMessage}
            isProfileUpdateSuccessful={isProfileUpdateSuccessful}
            isLoading={isLoading}
          />
          <Route exact path="/signin">
            {!loggedIn ? (
              <Login
                onLogin={handleLogin}
                message={errorMessage}
                resetMessage={resetErrorMessage}
                isLoading={isLoading}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signup">
            {!loggedIn ? (
              <Register
                onRegister={handleRegister}
                message={errorMessage}
                resetMessage={resetErrorMessage}
                isLoading={isLoading}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="*">
            <NotFound history={history} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
