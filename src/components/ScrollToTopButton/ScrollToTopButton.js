import styles from "./ScrollToTopButton.module.scss";
import { useEffect, useState } from "react";
import { ReactComponent as ButtonUpIcon } from "./button-up.svg";

export default function ScrollToTopButton() {
  const [ isVisible, setIsVisible ] = useState( false );

  useEffect( () => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible( true ) : setIsVisible( false );
    };

    window.addEventListener( "scroll", toggleVisibility );

    return () => {
      window.removeEventListener( "scroll", toggleVisibility );
    };
  }, [] );

  const scrollToTop = () => {
    isVisible &&
    window.scrollTo( {
      top: 0,
      behavior: "smooth",  // плавность прокрутки
    } );
  };

  return (
    <ButtonUpIcon
      width={ 40 }
      height={ 40 }
      alt="Вверх"
      className={ isVisible ? `${ styles[ "button-up" ] } ${ styles[ "button-up--visible" ] }` : styles[ "button-up" ] }
      onClick={ scrollToTop }
    />

  );
}