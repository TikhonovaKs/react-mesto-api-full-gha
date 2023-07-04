import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

function ImagePopup(cardProps) {
  const card = cardProps.card;
  const isVisible = card ? 'popup_is-opened' : '';
  usePopupClose(isVisible, cardProps.onClose);
  return (
    <div className={`popup popup_type_image popup_overley_dark ${isVisible}`}>
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__button-close"
          aria-label="Закрытие окна редактирования"
          type="button"
          onClick={cardProps.onClose}
        ></button>
        <img src={card ? card.src : ''} alt={card ? card.title : ''} className="popup__picture" />
        <h3 className="popup__picture-title">{card ? card.title : ''}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
