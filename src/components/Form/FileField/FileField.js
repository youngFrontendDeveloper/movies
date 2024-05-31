import styles from "../Form.module.scss";
import React, { useRef } from "react";
import Close from "../../Close/Close";

export default function FileField({ item, register, errors, error, imageName, handleChangeImage, handleDeleteImage }) {
  const imageRef = useRef();

  const handleClick = () => {
    imageRef.current?.click();
  };

  return (
    <div key={ item.id } style={ item.style }>
      <p className={ styles[ "form__item-file" ] }>

        <button
          type="button"
          className={ errors ? ( `${ styles[ "form__input-file" ] } ${ styles[ "form__input--error" ] }` ) : `${ styles[ "form__input-file" ] } ` }
          onClick={ handleClick }
        >Выбрать изображение
        </button>

        <span className={ styles[ "form__image-name" ] }>{ imageName }</span>
        { imageName && <Close width={ 15 } height={ 15 } onClick={ handleDeleteImage } /> }

        <input
          type="file"
          className={ `hidden ` }
          name={ item.name }
          id={ item.name }
          defaultValue={ item.defaultValue ? item.defaultValue : "" }
          { ...register }
          onChange={ (e) => handleChangeImage( e ) }
          accept="image/*, .png,.jpg, .jpeg, .gif, .webp, .svg, .icon, .heic"
          ref={ imageRef }
        />
      </p>
      { errors && <p className={ styles[ "form-error" ] }>{ errors.message }</p> }
      { error && <p className={ styles[ "form-error" ] }>{ error }</p> }
    </div>
  );
}