import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { ProtectedRoute } from './ProtectedRoute';
import * as auth from '../utils/auth.js';

function App() {
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // стейт для хранения карточек:
  const [cards, setCards] = React.useState([]);
  //switch state for edit profile popup:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  //switch state for edit avatar popup:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //switch state for adding a place popup:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  //switch state for image popup:
  const [selectedCard, setSelectedCard] = React.useState(null);
  // объявление состояния вошел ли пользователь в систему:
  const [loggedIn, setLoggedIn] = React.useState(false);
  // объявление состояния userData с начальным значением { email: '', password: '' }.
  // Для сохренения данных логина и email в профайле:
  const [userData, setUserData] = React.useState({ email: '' });
  //switch state for InfoTooltip:
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  //switch state for Register:
  const [isRegister, setIsRegister] = React.useState(false);

  //эффект обращения к API за инфо о пользователе и начальными карточками:
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
    api
      .getAllPlaces()
      .then((data) => {
        setCards(
          data.map((item) => ({
            likes: item.likes,
            _id: item._id,
            src: item.link,
            alt: item.name,
            owner: item.owner,
            title: item.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(curentCard) {
    setSelectedCard(curentCard);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardDelete(cardId) {
    api
      .deletePlace(cardId)
      .then(() => {
        /* используя методы массива, создаем новый массив карточек newCards, где не будет карточки, которую мы только что удалили */
        setCards((cards) => cards.filter((c) => c._id !== cardId));
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCardItem = {
          likes: newCard.likes,
          _id: newCard._id,
          src: newCard.link,
          alt: newCard.name,
          owner: newCard.owner,
          title: newCard.name,
        };
        setCards((state) => state.map((c) => (c._id === card._id ? newCardItem : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDisLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .disLikeCard(card._id, isLiked)
      .then((newCard) => {
        const newCardItem = {
          likes: newCard.likes,
          _id: newCard._id,
          src: newCard.link,
          alt: newCard.name,
          owner: newCard.owner,
          title: newCard.name,
        };
        setCards((state) => state.map((c) => (c._id === card._id ? newCardItem : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api
      .editProfileInfo(userData)
      .then((userResponse) => {
        setCurrentUser(userResponse);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((linkResponse) => {
        setCurrentUser(linkResponse);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace(place) {
    api
      .addPlace(place)
      .then((newCard) => {
        const newCardItem = {
          likes: newCard.likes,
          _id: newCard._id,
          src: newCard.link,
          alt: newCard.name,
          owner: newCard.owner,
          title: newCard.name,
        };
        setCards([newCardItem, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //  проверяем наличие токена в локальном хранилище:
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((user) => {
          setLoggedUserData(user.data.email, '/main');
        })
        .catch((err) => console.log(err));
    }
  };
  React.useEffect(() => {
    checkToken();
  }, []);

  // вызываем useNavigate() (переход на другие страницы) и useLocation() (информация о текущем маршруте):
  const navigate = useNavigate();
  const location = useLocation();

  // обрабатчик входа пользователя в систему (передаем в Login):
  const handleLogin = ({ password, email }) => {
    // обращаемся к API для аутентификации пользователя:
    auth
      .login(password, email)
      // обрабатываем успешное выполнение промиса, получив данные из ответа API в data.
      .then((data) => {
        // Проверяем, есть ли у полученных данных токен (data.token).
        if (data.token) {
          // Если токен существует, сохраняем токен в локальном хранилище:
          localStorage.setItem('jwt', data.token);
          // Устанавливаем значение loggedIn в true:
          // создаем переменную url, в которую записывается значение location.state?.backUrl или '/main' (если backUrl отсутствует):
          const url = location.state?.backUrl || '/main';
          setLoggedUserData(email, url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function setLoggedUserData(email, url) {
    setLoggedIn(true);
    // обновляем данные пользователя для отображения в шапке профиля:
    setUserData({ email });

    // переходим на нужный url:
    navigate(url);
  }
  function handleSignout() {
    localStorage.removeItem('jwt');
    // Устанавливаем значение loggedIn в false:
    setLoggedIn(false);
    // удаляем данные пользователя для отображения в шапке профиля:
    setUserData(null);
  }

  // Обработчик регистрации пользователя:
  const handleRegister = ({ password, email }) => {
    auth
      .register(password, email)
      .then((data) => {
        setIsRegister(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setIsRegister(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true)
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* Внедряем» данные из currentUser с помощью провайдера контекста */}
      <div className="App">
        <Header isLoggedIn={loggedIn} userData={userData} handleSignout={handleSignout} />
        <Routes>
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route
            exact
            path="/main"
            element={
              <ProtectedRoute
                isLoggedIn={loggedIn}
                element={
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    onCardDislike={handleCardDisLike}
                    cards={cards}
                  ></Main>
                }
              />
            }
          ></Route>
        </Routes>
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isRegister={isRegister} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <PopupWithForm popupName="popup_type_deleteCard" popupTitle="Вы уверены?" buttonName="Да"></PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
