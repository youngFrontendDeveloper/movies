import styles from "./Form.module.scss";
import TextField from "./TextField/TextField";
// import FileField from "./FileField/FileField";
import Button from "../Button/Button";


export default function Form({
                               formFields,
                               register,
                               errors,
                               handleSubmit,
                               onError,
                               onSubmit,
                               isMessageSent,
                               messageText,
                               btnClass,
                               btnText,
                               func,

                             }) {

  return (
    <>
      <form action="#" className={ styles.form } onSubmit={ handleSubmit( onSubmit, onError ) }>

        { formFields.map( (item, index) => {
            switch( item.type ) {

              case( "text" ):
                return (
                  <TextField
                    item={ item }
                    register={ register( `${ item.name }`
                    ) }
                    errors={ errors[ item.name ] }
                    key={ `${ item.name }-${ index }` }
                  />
                );

              // case( "file" ):
              //   return (
              //     <FileField
              //       item={ item }
              //       register={ register( `${ item.name }` ) }
              //       errors={ errors[ item.name ] }
              //       messageText={ messageText }
              //       key={ `${ item.name }-${ index }` }
              //     />
              //
              //   );

              default:
                return null;
            }
          }
        )
        }

        <p
          className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--nowrap" ] } ${ styles[ "form__item-required" ] }` }
        ><span className={ styles[ "form__required" ] }>*</span>- поля, обязательные для заполнения
        </p>

        { isMessageSent ? <p className={ styles[ "form__success" ] }>{ messageText }</p> : null }

        <Button btnClass={btnClass} func={func} text={ btnText } />
      </form>

    </>
  );
}

