import React, { useState } from 'react';
import Authentication from './Authentication';

function Register({ handleRegister }) {
  // Состояние формы:
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  // Состояние сообщения об ошибке:
  const [errorMessage, setErrorMessage] = useState('');

  // Обработчик изменения полей формы:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  // Обработчик отправки формы:
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.password || !formValue.email) {
      setErrorMessage('Both fields are required');
      return;
    }
    handleRegister(formValue);
  };

  return (
    <Authentication
      authenticationName="register"
      authenticationTitle="Регистрация"
      onSubmit={handleSubmit}
      buttonName="Зарегистрироваться"
    >
      <input
        id="email"
        type="email"
        name="email"
        autoComplete="email"
        className="authentication__input authentication__input_data_email"
        required
        minLength="2"
        maxLength="40"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
      />
      <span id="input-email-error" className="error"></span>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        className="authentication__input authentication__input_data_password"
        required
        minLength="2"
        maxLength="200"
        placeholder="Пароль"
        value={formValue.password}
        onChange={handleChange}
      />
      <span id="input-password-error" className="error"></span>
    </Authentication>
  );
}

export default Register;
