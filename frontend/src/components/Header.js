import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ isLoggedIn, userData, handleSignout }) {
  const location = useLocation();
  const isOnSignInPage = location.pathname === '/sign-in';
  let loginControl;
  let showEmail;

  if (isLoggedIn) {
    showEmail = <h2 className="header__email">{userData.email}</h2>;
    loginControl = (
        <Link to="/sign-in" className="header__button-title" onClick={handleSignout}>
          Выйти
        </Link>
    );
  } else {
    if (isOnSignInPage)
      loginControl = (
        <Link to="/sign-up" className="header__button-title">
          Регистрация
        </Link>
      );
    else
      loginControl = (
        <Link to="/sign-in" className="header__button-title">
          Войти
        </Link>
      );
  }

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место" className="logo" />
      <div className="header__login-info">
        {showEmail}
        <button type="submit" className="header__button-authentication header__signin" aria-label="Перейти">
          {loginControl}
        </button>
      </div>
    </header>
  );
}

export default Header;
