import styles from "./Form.module.scss";
import TextField from "./TextField/TextField";
import Button from "../Button/Button";
import FileField from "./FileField/FileField";


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
                               progress,
                               imageErr,
                               imageName,
                               handleChangeImage,
                               handleDeleteImage,
                               handleChangeText,
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
                    register={ register( `${ item.name }`, {
                        required: "Пожалуйста, введите не менее 4-x символов",
                        minLength: {
                          value: 4,
                          message: "Должно быть не менее 4-x символов",
                        },
                        // onChange: (e) => {
                        //   handleChangeText( e );
                        // }
                      }
                    ) }
                    errors={ errors[ item.name ] }
                    key={ `${ item.name }-${ index }` }
                  />
                );
              case( "file" ):
                return (
                  <FileField
                    item={ item }
                    register={ register( `${ item.name }` ) }
                    errors={ errors[ item.name ] }
                    error={ imageErr }
                    imageName={ imageName }
                    key={ `${ item.name }-${ index }` }
                    handleChangeImage={ handleChangeImage }
                    handleDeleteImage={ handleDeleteImage }
                  />
                );

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

        <Button btnClass={ btnClass } func={ func } text={ btnText } progress={ progress } />
      </form>

    </>
  );
}

