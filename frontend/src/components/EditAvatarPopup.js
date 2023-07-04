import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  // Стейт, в котором содержится значение инпута
  return (
    <PopupWithForm
      popupName="popup_type_avatar"
      popupTitle="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Сохранить"
      buttonNameIsLoad="Сохранение..."
      onSubmit={handleSubmit}
    >
      <input
        id="input-link-avatar"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_data_link"
        required
        ref={avatarRef}
      />
      <span id="input-link-avatar-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
