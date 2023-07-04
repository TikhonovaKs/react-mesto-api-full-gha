import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import React from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* Внедряем» данные из currentUser с помощью провайдера контекста */}
      <div className="App">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCardDislike={handleCardDisLike}
          cards={cards}
        />
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
