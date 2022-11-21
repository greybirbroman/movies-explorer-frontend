import {
  Redirect,
  Route,
  Switch,
  useHistory,
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
  NO_SHORTS,
  SEARCH_ERROR,
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
} from "../../utils/Const";

function App() {
  const history = useHistory();

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
  const [moreResults, setMoreResults] = useState(false); // ELSE Button

  const [loggedIn, setIsLoggedIn] = useState(false); // AUTHORIZATION
  const [currentUser, setCurrentUser] = useState({}); // USER

  // ------ TOKEN_CHECK
  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);


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
              setCurrentUser(null)
              setIsLoggedIn(false);
      })
      .finally(() => {
        setErrorMessage(message);
        setTimeout(() => resetErrorMessage(), 2000)
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

  //загрузка профиля и фильмов при логине
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([user, movies]) => {
          console.log("UserMovies", movies);
          console.log("User", user);
          setCurrentUser(user);
          const userMovies = movies.filter((movie) => movie.owner === user._id);
          localStorage.setItem("savedMovies", JSON.stringify(userMovies));
          setLikedMovies(userMovies);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        })
    }
  }, [loggedIn]);

  //Проверка токена при загрузке страницы
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          // Достаем из localStorage поисковый запрос
          const lastSearchWord = JSON.parse(localStorage.getItem("searchWord"));
          handleMoviesSearch(lastSearchWord);
        }
        //обнуляем сохраненный фильтр короткометражек
        localStorage.removeItem("shortIsOn");
        localStorage.removeItem("savedShortsIsOn");
      })
      .catch((err) => {
        console.log("Переданный токен некорректен!");
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
      });
  }

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
  function handleMoviesSearch(searchString) {
    localStorage.setItem("searchWord", JSON.stringify(searchString));
    let filterResults;
    if (!localStorage.movies) {
      //Обращение к API за получением ВСЕХ фильмов
      moviesApi
        .getAllMovies()
        .then((res) => {
          console.log("Все фильмы", res);
          //Сохранение фильмов в localStorage для поиска по нему
          localStorage.setItem("movies", JSON.stringify(res));
          filterResults = res.filter((movie) => {
            // Возвращаем совпадение по названию RU EN Director
            return (movie.nameRU || movie.nameEN || movie.director)
              .toLowerCase()
              .includes(searchString);
          });
          setLimit(windowSizeHandler);
          // Если чекбокс Короткометражек установлен
          if (shortMoviesSearch) {
            const shortMovies = filterResults.filter(
              (movie) => movie.duration <= SHORT_FILMS
            );
            // Отдаем все фильмы короче 40мин
            setFilteredMovies(shortMovies);
            if (shortMovies.length === 0) {
              setErrorMessage(SEARCH_ERROR_NO_DATA);
            }
          } else {
            setFilteredMovies(filterResults);
            if (filterResults.length === 0) {
              //setErrorMessage(SEARCH_ERROR_NO_DATA);
            }
          }
          moviesRender(filterResults, limit);
          //Сохраняем в localStorage наши отфильтрованые фильмы
          localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
        })
        .catch((err) => setErrorMessage(SEARCH_ERROR))
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    } else {
      setIsLoading(true);
      // Когда фильмы в нашем localStorage берем их оттуда
      filterResults = JSON.parse(localStorage.getItem("movies")).filter(
        (movie) => {
          return (movie.nameRU || movie.nameEN || movie.director)
            .toLowerCase()
            .includes(searchString);
        }
      );
      setLimit(windowSizeHandler);
      setTimeout(() => setIsLoading(false), 500);
      if (shortMoviesSearch) {
        const shortMovies = filterResults.filter(
          (movie) => movie.duration <= SHORT_FILMS
        );
        setFilteredMovies(shortMovies);
        console.log("Shorts", shortMovies);
        if (shortMovies.length === 0) {
          setErrorMessage(SEARCH_WORD_ERROR);
        }
      } else {
        setFilteredMovies(filterResults);
        console.log("FilteredMovies", filterResults);
        if (filterResults.length === 0) {
          setErrorMessage(SEARCH_ERROR_NO_DATA);
          setTimeout(() => resetErrorMessage(), 2000);
        }
      }
      moviesRender(filterResults, limit);
      localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
    }
  }

  //отрисовка фильмов с условиием короткометражек
  const shortMoviesSwitchClick = () => {
    const shortMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    setShortIsOn(!shortIsOn);
    if (!shortIsOn) {
      moviesRender(shortMovies, limit);
      if (filteredMovies.length === 0) {
        setErrorMessage(SEARCH_ERROR_NO_DATA);
        setTimeout(() => resetErrorMessage(), 2000);
      }
    } else {
      moviesRender(filteredMovies, limit);
    }
    localStorage.setItem("shortIsOn", !shortIsOn);
  };

  // effects for /movies
  useEffect(() => {
    const searchWord = JSON.parse(localStorage.getItem("searchWord"));
    const shortMovies = filteredMovies.filter((movie) => movie.duration <= SHORT_FILMS);
    setLastSearchWord(searchWord);
    setShortIsOn(localStorage.getItem("shortIsOn") === "true");
    if (localStorage.getItem("filteredMovies")) {
      const allFilteredMovies = JSON.parse(
        localStorage.getItem("filteredMovies")
      );
      moviesRender(allFilteredMovies, limit);
      if (localStorage.getItem("shortIsOn") === "true") {
        moviesRender(shortMovies, limit);
      } else {
        moviesRender(filteredMovies);
      }
    }
  }, []);

  // -----------------------------------------   Главный поиск Сохраненных Фильмов ---------------------------------------- //
  const handleSavedMoviesSearch = (searchString) => {
    setIsLoading(true);
    const filterResults = JSON.parse(
      localStorage.getItem("savedMovies")
    ).filter((movie) => {
      return (movie.nameRU || movie.nameEN || movie.director)
        .toLowerCase()
        .includes(searchString);
    });
    setAllLikedMovies(filterResults);
    if (filterResults.length === 0) {
      setErrorMessage(SEARCH_ERROR_NO_DATA);
      setTimeout(() => resetErrorMessage(), 2000);
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  //отрисовка сохраненных фильмов с фильтром короткометражек
  const handleChangeCheckboxSavedMovies = () => {
    if (!savedMoviesShortIsOn) {
      setSavedMoviesShortIsOn(true);
      localStorage.setItem("savedShortsIsOn", true);
      const savedShortMovies = likedMovies.filter(
        (movie) => movie.duration <= SHORT_FILMS
      );
      console.log('savedShorts')
      setAllLikedMovies(savedShortMovies);
      if (savedShortMovies.length === 0) {
        setErrorMessage(NO_SHORTS);
        setTimeout(() => resetErrorMessage(), 2000);
      }
    } else {
      setSavedMoviesShortIsOn(false);
      localStorage.setItem("savedShortsIsOn", false);
      if (likedMovies.length === 0) {
        setErrorMessage(SEARCH_ERROR_NO_DATA);
      }
      resetErrorMessage();
      setAllLikedMovies(likedMovies);
    }
  };

  useEffect(() => {
    if (likedMovies.length > 0) {
      resetErrorMessage();
    } else {
      setErrorMessage(SEARCH_ERROR_NO_DATA);
    }
  }, [likedMovies]);

  // effects for /saved-movies
  useEffect(() => {
    if (localStorage.getItem("savedShortsIsOn") === "true") {
      setSavedMoviesShortIsOn(true);
      const savedShortMovies = likedMovies.filter(
        (movie) => movie.duration <= SHORT_FILMS
      );
      setAllLikedMovies(savedShortMovies);
    } else {
      setSavedMoviesShortIsOn(false);
      setAllLikedMovies(likedMovies);
    }
  }, [likedMovies]);

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

  // Правила для кнопки ELSE
  const showMore = () => {
    let newLimit;
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
        const updatedLikedMovies = [...likedMovies, savedCard];
        setLikedMovies(updatedLikedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(SAVE_ERROR);
        setTimeout(() => resetErrorMessage(), 1000)
      });
  };

  const isSavedMovies = (movie) => {
    return likedMovies.some((card) => card.movieId === movie.id && card.owner === currentUser._id
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
        setLikedMovies(likedMovies.filter((currentCard) => currentCard._id !== deleteCard._id));
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(DELETE_ERROR);
        setTimeout(() => resetErrorMessage(), 1000)
      });
  }

  const resetErrorMessage = () => {
    setErrorMessage("");
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
            onToggleSwitchClick={handleChangeCheckboxSavedMovies}
            savedIsChecked={savedMoviesShortIsOn}
            errorMessage={errorMessage}
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
            {!loggedIn ? (
              <NotFound history={history} />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
