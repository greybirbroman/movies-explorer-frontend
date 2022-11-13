import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
} from "../../utils/Const";

function App() {
  const history = useHistory();
  const location = useLocation();

  const [profileUpdateMessage, setProfileUpdateMessage] = useState("");
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const [isProfileUpdateSuccessful, setIsProfileUpdateSuccessful] = useState(false);

  const [resultMovies, setResultMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [savedShortMoviesSearch, setSavedShortMoviesSearch] = useState(false); // Короткометражки для Saved-Films
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
  }, []);

  // Установить количество карточек отображаемых на странице
  const [limit, setLimit] = useState(() => {
    if (window.innerWidth <= 450) {
      return 5;
    } else if (window.innerWidth <= 768) {
      return 8;
    } else if (window.innerWidth > 768) {
      return 12;
    }
  });

  // Для Экранов и планшетов добавляем 3 для смартфонов 2
  const [resultsToAdd, setResultsToAdd] = useState(() => {
    if (window.innerWidth <= 768) {
      return 2;
    } else if (window.innerWidth > 768) {
      return 3;
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
    if (window.innerWidth <= 480) {
      setLimit(5);
      setResultsToAdd(2);
    } else if (window.innerWidth <= 768) {
      setLimit(8);
      setResultsToAdd(2);
    } else if (window.innerWidth > 768) {
      setLimit(12);
      setResultsToAdd(3);
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
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
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
      })
      .finally(() => {
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
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
    history.push("/");
    console.log("Вышли из учетной записи");
  }

  //загрузка профиля и фильмов при логине
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([user, movies]) => {
          console.log("Мои сохраненные фильмы", movies);
          setCurrentUser(user);
          const userMovies = movies.filter((movie) => movie.owner === user._id);
          localStorage.setItem("savedMovies", JSON.stringify(userMovies));
          setLikedMovies(userMovies);
          history.push("/movies");
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
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
          // Достаем из localStorage поисковый запрос и сохраняем в строку
            const lastSearchWord = JSON.parse(
              localStorage.getItem("searchWord"))
            // Записать в строку последний запрос
            setLastSearchWord(lastSearchWord);
            handleMoviesSearch(lastSearchWord);
            // Проверить состояние чекбокса короткометражек в localStorage
            if (localStorage.shortIsOn) {
              setShortMoviesSearch(true);
            }
        }
        //обнуляем сохраненный фильтр короткометражек
        localStorage.removeItem("shortIsOn");
      })
      .catch((err) => {
        console.log(err);
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
    setIsLoading(true);
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
          setTimeout(() => setIsLoading(false), 500);
          // Если чекбокс Короткометражек установлен
          if (shortMoviesSearch) {
            const shortMovies = filterResults.filter(
              (movie) => movie.duration <= 40
            );
            // Отдаем все фильмы короче 40мин
            setFilteredMovies(shortMovies);
            if (shortMovies.length === 0) {
              setErrorMessage(SEARCH_ERROR_NO_DATA);
            }
          } else {
            setFilteredMovies(filterResults);
            if (filterResults.length === 0) {
              setErrorMessage(SEARCH_ERROR_NO_DATA);
            }
          }
          moviesRender(filterResults, limit);
          //Сохраняем в localStorage наши отфильтрованые фильмы
          localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
        })
        .catch((err) => console.log(err));
    } else {
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
          (movie) => movie.duration <= 40
        );
        setFilteredMovies(shortMovies);
        console.log("Короткометражки", shortMovies);
        if (shortMovies.length === 0) {
          setErrorMessage(SEARCH_ERROR_NO_DATA);
        }
      } else {
        setFilteredMovies(filterResults);
        console.log("Отфильтровано по запросу", filterResults);
        if (filterResults.length === 0) {
          setErrorMessage(SEARCH_ERROR_NO_DATA);
        }
      }
      moviesRender(filterResults, limit);
      localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
    }
  }

  // Отобразить фильмы /movies при наличии фильтра на короткометражки
  useEffect(() => {
    shortMoviesRenderer();
  }, [shortMoviesSearch]);

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
    setLikedMovies(filterResults);
    if (filterResults.length === 0) {
      setErrorMessage(SEARCH_WORD_ERROR);
    }
    //отключаем загрузчик
    setTimeout(() => setIsLoading(false), 500);
  };

  const shortMoviesSwitchClick = () => {
    setShortMoviesSearch(!shortMoviesSearch);
  };

  //Отобразить сохраненные фильмы /saved-movies при наличии фильтра на короткометражки
  useEffect(() => {
    shortSavedMoviesRenderer();
  }, [savedShortMoviesSearch]);

  //отрисовка фильмов с условиием короткометражек
  const shortMoviesRenderer = () => {
    if (shortMoviesSearch) {
      setShortIsOn(true);
      localStorage.setItem("shortIsOn", "true");
      const shortMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40
      );
      moviesRender(shortMovies, limit);
      if (shortMovies.length === 0) {
        setErrorMessage(SEARCH_ERROR_NO_DATA);
      }
    } else {
      const allFilteredMovies = JSON.parse(
        localStorage.getItem("filteredMovies")
      );
      moviesRender(allFilteredMovies, limit);
      setShortIsOn(false);
    }
  };

  //изменение стейта короткометражек по нажатию на переключатель на главной странице
  const shortSavedMoviesSwitchClick = () => {
    setSavedShortMoviesSearch(!savedShortMoviesSearch);
  };

  //отрисовка сохраненных фильмов с фильтром короткометражек
  const shortSavedMoviesRenderer = () => {
    if (savedShortMoviesSearch) {
      setSavedMoviesShortIsOn(true);
      const savedShortMovies = likedMovies.filter(
        (movie) => movie.duration <= 40
      );
      setLikedMovies(savedShortMovies);
      if (savedShortMovies.length === 0) {
        setErrorMessage(NO_SHORTS);
      }
    } else {
      const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
      setLikedMovies(savedMovies);
      setSavedMoviesShortIsOn(false);
    }
  };

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
        console.log("сохранено");
        const updatedLikedMovies = [...likedMovies, savedCard];
        setLikedMovies(updatedLikedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
      })
      .catch((err) => console.log(err));
  };


  const idCardSearch = (card) => {
    if (!card._id) {
      const thisCard = likedMovies.find(
        (likedMovie) => likedMovie.movieId === card.id
      );
      return thisCard._id;
    } else {
      return card._id;
    }
  };

  // Удалить фильм с сервера и из списка сохраненных фильмов
  const deleteMovie = (cardMovie) => {
    const searchId = idCardSearch(cardMovie);
    mainApi
      .deleteMovie(searchId)
      .then(() => {
        console.log("удалено", cardMovie);
        let updatedLikedMovies = [];
        if (location.pathname === "/movies") {
          updatedLikedMovies = likedMovies.filter(
            (movie) => movie.movieId !== cardMovie.id
          );
        } else {
          updatedLikedMovies = likedMovies.filter(
            (movie) => movie._id !== cardMovie._id
          );
        }
        localStorage.setItem("savedMovies", JSON.stringify(updatedLikedMovies));
        setLikedMovies(updatedLikedMovies);
      })
      .catch((err) => console.log(err));
  };

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
            exact
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
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            movies={likedMovies}
            onSearch={handleSavedMoviesSearch}
            onUnlike={deleteMovie}
            isLoading={isLoading}
            loggedIn={loggedIn}
            savedMovies={likedMovies}
            shortMoviesOn={shortMoviesSearch}
            onToggleSwitchClick={shortSavedMoviesSwitchClick}
            savedIsChecked={savedMoviesShortIsOn}
            errorMessage={errorMessage}
          />
          <ProtectedRoute
            exact
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
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              message={errorMessage}
              resetMessage={resetErrorMessage}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              message={errorMessage}
              resetMessage={resetErrorMessage}
              isLoading={isLoading}
            />
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
