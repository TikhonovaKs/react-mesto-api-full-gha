import React from 'react';
import usePopupClose from '../hooks/usePopupClose';
import unionSuccess from '../images/Union-success.svg';
import unionFail from '../images/Union-fail.svg';

function InfoTooltip({ isOpen, onClose, isRegister }) {
  const popupVisibleClass = isOpen ? 'popup_is-opened' : '';
  usePopupClose(isOpen, onClose);

  let tooltipControl;
  if (isRegister) {
    tooltipControl = (
      <>
        <img className="popup__tooltip-logo" src={unionSuccess} alt="Логотип успешной регистрации" />
        <h3 className="popup__tooltip-title">Вы успешно зарегистрировались!</h3>
      </>
    );
  } else {
    tooltipControl = (
      <>
        <img className="popup__tooltip-logo" src={unionFail} alt="Логотип неуспешной регистрации" />
        <h3 className="popup__tooltip-title">Что-то пошло не так! Попробуйте еще раз.</h3>
      </>
    );
  }

  return (
    <div className={`popup popup_type_tooltip popup_overley_dark ${popupVisibleClass}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="popup__button-close"
          aria-label="Закрытие окна информирования"
          type="button"
          onClick={onClose}
        ></button>
        {tooltipControl}
      </div>
    </div>
  );
}

export default InfoTooltip;
