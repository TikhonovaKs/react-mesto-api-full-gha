import React from 'react';
// Импортируем объект контекста:
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike, onCardDislike }) {
  // Подписываемся на контекст CurrentUserContext:
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_is-active'}`;

  function handleLikeClick() {
    if (isLiked) {
      onCardDislike(card);
    } else {
      onCardLike(card);
    }
  }

  return (
    <li className="element">
      <img className="element__image" alt={card.alt} src={card.src} onClick={(_) => onCardClick(card)} />
      {isOwn && (
        <button
          className="element__trash-button"
          aria-label="Удаление элемента"
          type="button"
          onClick={(_) => onCardDelete(card._id)}
        ></button>
      )}
      <div className="element__description">
        <h2 className="element__name">{card.title}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            aria-label="Выбор понравившегося элемента"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <h3 className="element__like-amount">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
