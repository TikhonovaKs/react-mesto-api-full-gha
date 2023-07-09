import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // Стейты, в котором содержится значения инпутов
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Обработчик изменения инпута name и description обновляет стейты
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      popupName="popup_type_edit"
      popupTitle="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName="Сохранить"
      buttonNameIsLoad="Сохранение..."
      formName="edit-profile-form"
    >
      <input
        id="input-name"
        type="text"
        name="name"
        className="popup__input popup__input_data_name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span id="input-name-error" className="error"></span>
      <input
        id="input-job"
        type="text"
        name="job"
        className="popup__input popup__input_data_job"
        required
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span id="input-job-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
