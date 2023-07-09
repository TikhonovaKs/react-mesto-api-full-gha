import React from 'react';

function Authentication ({ authenticationName, authenticationTitle, onSubmit, children, buttonName }) {
  return (
    <div className={`authentication authentication_type_${authenticationName}`}>
      <div className="authentication__container">
        <h2 className="authentication__title">{authenticationTitle}</h2>
        <form 
          className="authentication__form" 
          name="authentication" 
          onSubmit={onSubmit}>
          {children}
          <button type="submit" className="authentication__button-save" aria-label="Сохранить изменения">
            <h3 className="authentication__button-title">{buttonName}</h3>
          </button>
        </form>
      </div>
    </div>
  );
}
export default Authentication;