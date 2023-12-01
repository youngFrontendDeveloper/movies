import React from "react";
import styles from "../Form.module.scss";

export default function TextField({ item, register, errors, }) {

  return (
    <div>
      <p className={ styles[ "form__item" ] }>
        <label className={ styles[ "form__label" ] } htmlFor={ item.name }>
          { item.label }
          { item.required ? <span className={ styles[ "form__required" ] }>*</span> : null }
        </label>
        <input
          type="text"
          className={ errors ? ( `${ styles[ "form__input" ] } ${ styles[ "form__input--error" ] }` ) : `${ styles[ "form__input" ] }` }
          name={ item.name }
          id={ item.name }
          placeholder={ item.placeholder }
          defaultValue={ item.defaultValue ? item.defaultValue : "" }
          { ...register }
        />
      </p>
      { errors && <p className={ styles[ "form--error" ] }>{ errors.message }</p> }
    </div>
  );
}


