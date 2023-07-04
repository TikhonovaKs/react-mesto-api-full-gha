import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [linkValue, setLinkValue] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');

  React.useEffect(() => {
    setLinkValue('');
    setNameValue('');
  }, [isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameValue,
      link: linkValue,
    });
  }
  function handleNameChange(event) {
    setNameValue(event.target.value);
  }

  function handleLinkChange(event) {
    setLinkValue(event.target.value);
  }

  return (
    <PopupWithForm
      popupName="popup_type_card"
      popupTitle="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Создать"
      buttonNameIsLoad="Создание..."
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        id="input-place"
        minLength="2"
        maxLength="30"
        type="text"
        name="place"
        placeholder="Название"
        className="popup__input popup__input_data_place"
        required
        value={nameValue}
        onChange={handleNameChange}
      />
      <span id="input-place-error" className="error"></span>
      <input
        id="input-link-card"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_data_link"
        required
        value={linkValue}
        onChange={handleLinkChange}
      />
      <span id="input-link-card-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
