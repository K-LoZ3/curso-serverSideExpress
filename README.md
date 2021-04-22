# Proyecto en React
## Nuevo curso de React router y redux
Para empezar preparando todo el prof crea una rama diferente para este curso e instalamos. "react-router-dom"
   ~~~
   npm install react-router-dom --save
   ~~~
### Atributos para los Route Objectos:
path: la ruta en la que se renderizará el componente en forma de cadena de texto
exact: un booleano para definir si queremos que la ruta tiene o no que ser exacta para renderizar un componente. Eg: /index !== /index/all.
strict: un booleano para definir si queremos que el último slash sea tomado en cuenta para renderizar un componente. Eg: /index !== /index/.
sensitive: un booleano para definir si queremos distinguir entre minúsculas y mayúsculas, y tomar esto en cuenta para renderizar un componente. Eg: /index !== /Index
component: recibe un componente a renderizar. Crea un nuevo elemento de React cada vez. Esto causa que el componente se monte y desmonte cada vez (no actualiza).
render: recibe un método que retorna un componente. A diferencia de component no remonta el componente.
#### Crear nuestro archivo de Rutas
Dentro de nuestro proyecto vamos a crear una carpeta llamada routes donde vamos a ir añadiendo las rutas que necesitemos en la aplicación.
Las rutas que añadamos debemos definirlas con el componente Route y estas deben estar encapsuladas dentro del componente BrowserRouter del paquete de react-router-dom. Para definir una ruta con el componente Route debemos pasarle las props de:
path para indicar la url.
exact si queremos que funcione única y exactamente con la url que le digamos.
component para indicarle el componente que va a renderizar.
1. Creamos un archivo "App.js" en este pondremos la logica de react para las rutas.
   ~~~
   import React from 'react';
   import { BrowserRouter, Route } from 'react-router-dom';
   import Home from '../containers/Home';

   const App = () => (
      <BrowserRouter>
         <Route exact path="/" component={Home} />
      </BrowserRouter>
   );

   export default App;
   ~~~
2. Renombramis el componente App creado antes por para usarlos desde este archivo.
3. Cambiamos el import en index.js para que reiba como componente principal a este archivo.
   ~~~
   import App from './routes/App';
   // ...
   ~~~
#### Container Login
Manejamos multiples rutas con react.
1. Creamos en "containers" un componente "Login.jsx". dentro pondremos el componente.
   ~~~
    import React from 'react';

    const Login = () => (
       <section className='login'>
         <section className='login__container'>
            <h2>Inicia sesión</h2>
            <form className='login__container--form'>
               <input className='input' type='text' placeholder='Correo' />
               <input className='input' type='password' placeholder='Contraseña' />
               <button className='button'>Iniciar sesión</button>
               <div className='login__container--remember-me'>
                  <label>
                     <input type='checkbox' id='cbox1' value='first_checkbox' />
                     Recuérdame
                  </label>
                  <a href='/'>Olvidé mi contraseña</a>
               </div>
            </form>
            <section className='login__container--social-media'>
               <div>
                  <img src='../assets/google-icon.png' /> Inicia sesión con Google
               </div>
               <div>
                  <img src='../assets/twitter-icon.png' /> Inicia sesión con Twitter
               </div>
            </section>
            <p className='login__container--register'>
               No tienes ninguna cuenta <a href=''>Regístrate</a>
            </p>
         </section>
      </section>
   );

   export default Login;
   ~~~
2. incorporamos las imagenes entro del archivo.
   ~~~
   import googleIcon from '../assets/static/google-icon.png';
   import twitterIcon from '../assets/static/twitter-icon.png';
   // ...
   <section className='login__container--social-media'>
      <div>
         <img src={googleIcon} /> Inicia sesión con Google
      </div>
      <div>
         <img src={twitter} /> Inicia sesión con Twitter
      </div>
   </section>
   // ...
   ~~~
2. Creamos el Login.scss para los estilos de este conteiner ademas de importar los estilos dentro del componente.
   ~~~
   .login {
      background-image: linear-gradient(#21c08b, #8f57fd);
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 0px 30px;
      min-height: calc(100vh - 200px); /* El ancho será igual al tamaño de todo el height menos 200px (100px del header + 100px del footer) */
   }

   .login__container {
      background-color: rgba(255,255,255,0.1);
      border: 2px solid white;
      border-radius: 40px;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      min-height: 700px;
      padding: 60px 60px 40px;
      width: calc(100% / 2);
   }

   .login__container--form {
      display: flex;
      flex-direction: column;
   }

   .login__container--form label {
      font-size: 14px;
   }

   .login__container--remember-me {
      color: white;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
   }

   .login__container--remember-me a {
      color: white;
      font-size: 14px;
      text-decoration: none;
   }

   .login__container--remember-me a:hover {
      text-decoration: underline;
   }

   .login__container--social-media > div {
      align-items: center;
      display: flex;
      font-size: 14px;
      margin-bottom: 10px;
   }

   .login__container--social-media > div > img {
      margin-right: 10px;
      width: 30px;
   }

   .login__container--register {
      font-size: 14px;
   }

   .login__container--register a {
      color: white;
      font-weight: bold;
      font-size: 16px;
      text-decoration: none;
   }

   .login__container--register a:hover {
      text-decoration: underline;
   }

   .login__container--form > .input {
      background-color: transparent;
      border-bottom: 2px solid white;
      border-left: 0px;
      border-right: 0px;
      border-top: 0px;
      color: white;
      font-family: 'Muli', sans-serif;
      font-size: 16px;
      height: 50px;
      margin-bottom: 20px;
      outline: none;
      padding: 0px 20px;
      min-width: 100%;
   }

   ::placeholder {
      color: white;
   }

   .button {
      background-color: rgba(255, 255, 255, 0.3);
      border: none;
      border-radius: 25px;
      color: white;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      font-family: 'Muli', sans-serif;
      height: 50px;
      letter-spacing: 1px;
      margin: 10px 0px;
   }
   ~~~
3. En "App.js" importamos login y lo añadimos a una ruta.
   ~~~
   import Login from '../containers/Login';
   // ...
   <Route exact path="/" component={Home} />
   <Route exact path="/login" component={Login} />
   // ...
   ~~~
4. Debemos modificar nuestra configuración del entorno de desarrollo local para que pueda funcionar con el uso de rutas, debemos ir al archivo webpack.config.js y añadir este fragmento de código antes de plugins:
   ~~~
   // ...
   devServer: {  
      historyApiFallback: true,  
   },
   plugins: [
   // ...
   ~~~
#### Cntainer Register
Hacemos lo mismo que con login.
1. Creamos el container.
2. Creamos los estilos y los importamos en el container.
3. Agregamos la ruta "/regiter" al App.js.
4. Incluimos switch en el proyecto importandolo de react-router-dom.
   - Para asegurar que nuestras rutas solamente se rendericen con la que haga match con la url debemos encapsular las rutas dentro del componente .
   ~~~
   <Switch>
   // Rutas
   </Switch>
   ~~~
   - La diferencia entre poner el switch y no ponerlo es que cuando tienes el mismo path para todos solamente toma el primero y lo renderiza.
#### Container NotFound
Este es el componente que se mostrara cuando no se encuentre la ruta dentro del proyecto. Los pasos son los mismos salvo que la ruta no tendra path ni sera exact, de esta manera este coponente pasara cuando se coloque alguna ruta que no este expecificada. Debemos añadir esta ruta al final del Switch para que sea el caso por default.
#### Componente Layout
Este componente se encargara de presentar el header y el footer simpre para que no haga falta importarlos en cada componente.
1. Lo creamos y dentro le ponemos la funcionalidad de recibir un hijo.
2. lo importamos dentro de App.js y el hijo que recivira sera el Switch component con las rutas que manejara.
#### Manejando enlaces y configuraciones
Esto es con el Componente Link de "react-router-dom".El componente es similar a un elemento ya que nos permite navegar dentro de la aplicación, pero sin la necesidad de tener que recargar la página. Para indicarle el destino a simplemente debemos pasarle la prop to='/mi-enlace'.
1. Importamos Link en cada componente que se necesite.
2. Cada enlace se cambiara por este componente y su ruta.
### Redux
#### ¿Que es Redux?
Redux nos permite tener un contenedor predecible del estado en aplicaciones creadas con JavaScript, Nos ayuda a escribir aplicaciones que se comportan de una manera consistente, Esto significa que podemos utilizar esta lógica en aplicaciones del lado del cliente, trabajar del lado del servidor o crear aplicaciones para dispositivos móviles.
Uno de los principales uso que tiene Redux es con React pero puede ser implementado en cualquier librería o proyecto que este construido con JavaScript, lo cual incluye a Angular, Vue o algún otro framework o librería.
Redux nace de la arquitectura Flux, tomando inspiración del lenguaje funcional Elm y es creado por Dan Abramov y Andrew Clark en el 2015, Hoy en día es una de las librerías más utilizadas para el manejo del flujo de la información en aplicaciones.
Una de las principales motivaciones para crear Redux nace en resolver un problema y era el manejo del estado y el flujo de nuestras aplicaciones creadas en JavaScript. Redux propone una forma de manejar el estado donde podamos controlar cómo vamos a interactuar con otros elementos (llamadas a un API) o interacciones dentro de nuestra aplicación, teniendo en cuenta esto, Redux intenta de predecir las mutaciones que pueda sufrir el estado, creando restricciones de cuando y como pueden ser ejecutadas las actualizaciones en nuestras aplicaciones.
Redux es una librería muy pequeña que se puede incorporar en cualquier proyecto construido en JavaScript y se basa en tres principios:
###### Única fuente de la verdad:
Nuestra aplicación solo debe de tener un único Store y es la única fuente de información.
###### El estado es de solo lectura
La única forma de modificar el estado es emitiendo un acción, este objeto describe lo que va a ocurrir.
###### Los cambios se realizan con funciones puras
Para realizar cambios al estado es necesario utilizar Reducers los cuales son funciones puras que toman el estado anterior, una acción y devuelve un nuevo estado con las modificaciones necesarias.
Teniendo en cuenta esta información continuaremos en el curso explicando cada uno de estos elementos que incorpora Redux en nuestra aplicación Platzi Video.
###### Provider
Recuerdar que se tiene que encapsular nuestra aplicación dentro de un provider, porque nada fuera del provider podrá acceder al store.
El Provider hace que la store de Redux esté disponible para cualquier componente anidado que se haya incluido en la función connect().
Dado que cualquier componente React en una aplicación React Redux se puede conectar, la mayoría de las aplicaciones mostrarán un Provider en el nivel superior, con el árbol de componentes completo de la aplicación dentro de él Normalmente, no puede usar un componente conectado a menos que esté anidado dentro de un Provider.
EL lugar donde se usa el Provider es en index.js ya que si encapsulamos el componente App al momento de pasarlo al render todos los componentes podran entrar al Provider.
1. Instalamos redux y react-dedux como dependencia de produccion.
   ~~~
   npm install redux react-redux --save
   ~~~
2. Creamos las carpetas "actions" y "reducers", dentro de cada una incluiremos un index.js que tendra la logica de cada uno.
3. Importamos react-redux y el redux para el Provider y el createStore dentro del index.js principal.
*Esta basado en el patrón de diseño Flux
*Toda la data de la aplicación, se encuentra en una estructura previamente definida.
*Toda la informción se encontrará almacenada en un único lugar llamado STORE.
*El STORE jamas se modifica de forma directa.
*Interacciones de usuario y/o código, dispara acciones que describen qué sucedió
*El valor actual de la información de la aplicación se llama - State
*Un nuevo estado es creado, en base a la combinanción del viejo estado y una acción, por una función llamada Reducer.
###### Creando el Store de Redux
Para crear un Store necesitamos llamar a la función createStore del paquete de redux pasándole los parámetros del reducer y initialState.
Para conectar un componente a Redux vamos a necesitar importar connect de react-redux, connect va a aceptar dos parámetros:
mapStateToProps: es una función que le va a indicar al provider qué información necesitamos del store.
mapDispatchToProps: es un objeto con las distintas funciones para ejecutar una action en Redux.
4. Usamos el create estore para crear el store con los datos iniciales y cargarlos al provider.
   ~~~
   const store = createStore(reducer, initialState);
   ~~~
   - El initialState tendra el Json de toda la base de datos. todo el Json del initialState.json.
5. En el "Home" que es el unico componente que de momento necesita datos aremos los cambios para que use el store creado.
   - Importamos connect de react-redux para conenctar con el store y lo implementamos al exportar el componente.
      ~~~
      export default connet(mapStateToProps, null)(Home);
      ~~~
      Los parametros estan definidos arriba. En el segundo pasamos null porque no tenemos acciones dentro del proyecto, estas la agregaremos luego.
   - Creamos la funcion del primer parametro.
      ~~~
      const mapStateToProps = state => {
         return {
            myList: state.myList,
            trends: state.trends,
            originals: state.originals,
         }
      }
      ~~~
   Ya state que es el parametro que recive esta funcion se lo pasa connect dentro de ella cuando esta conectando y esto seria el estado inicial, o store con el estado inicial que le pasamos, o el estado que tenga si fue modificado. Es por eso que puede llamar a los elementos del initialState, luego retornamos un objeto con esos valores en sus respectivos argumentos para que los reciba Home component desde los props de manera destrusturada los podemos usar muy facil.
      ~~~
      // ...
      const Home = ({ myList, trends, originals }) => {
      // ...
      ~~~
6. Creamos el reducer ('src/reducers/index.js') que le pasamos a la funcion createStore en el index pricipal y lo importamos en este.
   ~~~
   const reducer = (state, action) => {
      return state;
   }

   export default reducer;
   ~~~
   Este es sencillo puesto que no se tenemos ni acciones ni nada que necesite cambiar el store. Retornamos el estado inicial tal cual lo recibimos.
#### Creando los reducers y actions
Un action de Redux va a contener dos elementos:
type: para indicar la acción que se va a ejecutar.
payload: es la información que estamos mandando al reducer.
Dentro de los reducers usaremos un switch para separar la lógica por cada tipo de acción que tendremos en Redux.
1. Comenzamos con crear el action. Este debe ser una funcion recibe el cambio que se quiere hacer y retorna un objeto con dos campos. El primero "type" describe la accion y el segundo "payload" guarda el valor del cambio que se quiere hacer.
   ~~~
   export const setFavorite = payload => ({
      type: 'SET_FAVORITE',
      payload,
   });
   ~~~
2. Modificamos el reducer. Por lo general tendra un switch que verificara dentro de "action.type" que se quiere hacer.
De esta manera pasaremos por una logica que comprobara en distintos casos cual ejecutar. En el caso que queremos debemos retornar un objeto con todo el estado "inicial" destructurado y como segundo argumento pisamos el campo que se quiere modificar y le pasamos el payload para agregar lo nuevo. Como myList es un array, destructuramos todo ese array para que tenga todo lo anterior y le pasamos el payload para que se agrege otro item, como si  fuera una suma de la misma variable (i = i + 1;)
   ~~~
   const reducer = (state, action) => {
      switch (action.type) {
         case 'SET_FAVORITE':
            return {
               ...state,
               myList: [...state.myList, action.payload],
            } // No hace falta el breack porque estamos retornando.
         default:
            return state;
      }
   }

   export default reducer;
   ~~~
3. En el componente que se ejecutaran la acciones, en este caso sera en "CarouselItem" ya que aqui es donde esta el boton de agregar, se usara el action, para esto conectamos el componente con "connect" pero esta vez como el item se le pasa por parametro al componente no necesitamos pasar el primer parametro de connect. Solo pasamos el segundo parametro que sera un objeto con la funcion del action que se va a usar.
4. Esta al conectarla ya se pasa por medio de props y la podremos usar. Para esto creamos otra funcion que tendrea la logica que hara que reciba el payload y nada mas.
   ~~~
   // ...
   const CarouselItem = props => {
   const { id, cover, title, year, contentRating, duration } = props;
   const handleSetFavorite = () => {
      props.setFavorite({
         id, cover, title, year, contentRating, duration
      });
   }
   return (
      <div className="carousel-item">
   // ...
   ~~~
5. Esta funcion "handleSetFavorite" sera la que usemos en el boton.
   ~~~
   // ...
   <img className="carousel-item__details--img" src={playIcon} alt="Play Icon" /> 
   <img 
      className="carousel-item__details--img" 
      src={plusIcon} 
      alt="Plus Icon"
      onClick={handleSetFavorite}
   />
   // ...
   ~~~
   Sucede que esta funcion queda "seteada" con los datos al crear el componente esperando que el boton sea preccionado.
   Creamos luego el boton de borrado. Este sera igual que el anterior solo que tendra un action diferente con el "type" 'DELETE_FAVORITE' y un case con este type en el reducer que se encargara de eliminar del array myList este item. Con este solo pasamos el ide al action ya que solo es para identificar cual sera borrado y lo pasamos a la funcion handle de este action que se crea en el componente, ademas de que en el onClick tambien debemos pasar el valor que recibe.
   ~~~
   const handleDeleteFavorite = itemId => {
      props.deleteFavorite(itemId);
   }
   // ...
   onClick={() => handleDeleteFavorite(id)}
   ~~~
   O tambien podemos hacerlo de otra manera ya que el id es recivido en los props y se setearia este valor dentro del handle. No estoy seguro de si es segura pero esta.
   ~~~
   const handleDeleteFavorite = () => {
      props.deleteFavorite(id);
   };
   // ...
   onClick={handleDeleteFavorite} 
   ~~~
   validamos que no se dupliquen items al agregarlos a myList.
   ~~~
   case 'SET_FAVORITE':
      return {
         ...state,
         myList: [...state.myList.filter(item => item.id !== action.payload.id), action.payload],
      }
   ~~~
   En el reducer para evitar duplicados. Otro ejemplo puede ser.
   ~~~
   case 'SET_FAVORITE':
      const exist = state.mylist.find(item => item.id === action.payload.id)
      if (exist) return state;
      return {
        ...state,
        mylist: [...state.mylist, action.payload]
      }
   ~~~
   Otro ejemplo puede ser.
   ~~~
   case 'SET_FAVORITE':
      return state.myList.find(item => item.id === action.payload.id)
         ? state
         : {
            ...state,
            myList: [...state.myList, action.payload]
         }
   ~~~
6. corregimos que tanto el boton para borrar como el de agregar solo se vean si es necesario. En el caso de myList solo se debe ver el de borrar y en los otros el de agregar.
   - Validamos con in buleano. En el componente desde home le pasamos al CarouselItem "isList" como argumento sin nada para que sea un boleano establecido como verdadero, si quisieramos que estuviera en falso seria "isList={false}" de esta manera luego con una condicional se valida que boton mostrar si este es falso o verdadero.
#### Crear Formulario de Login
Creamos la funcionalidad de recibir los datos del formulario.
De esta manera podemos recivir los datos que se envian del formulario. Esto lo aremos con react hooks (useState).
1. Importamos useState de react y creamos 2 constantes (from, setValues), la primera sera el formulario y la segunda la funcion para modificar la primera. Las inicializamos con useState y como valor inicial le pasamos a useState un objeto con un parametro email vacio.
   ~~~
   const Login = () => {
      const [from, setValues] = useState({
         email: '',
      });
      return (
         // ...
      )
   }
   ~~~
2. Preparamos el formulario para manejar los cambios en el formulario y el envio de estos.
   - Creamos una funcion para el manejo de los cambios.
      ~~~
      const handleInput = event => {
         setValues({
            ...form,
            [event.target.name]: event.target.value,
         });
      }
      ~~~
      Aqui estamos usando setValues para que actualice la informacion que se esta escribiendo el el formulario y se guardo en nuestra variable form. Con ([...]: ...) lo que estamos haciendo es que de forma dinamica estamos buscando el nombre del formulario y le etamos pasando el valor correspondiente para luego agregarla al form.
      - Le ponemos un name a cada input para que lo anterior funcione y le agregamos esta funcion para que se ejecute en cada cambio del input.
         ~~~
         // ...
         <input 
            name="email"
            className="input"
            type="text"
            placeholder="Correo"
            onChange={handleInput}
         />
         <input 
            name="password"
            className="input"
            type="password"
            placeholder="Contraseña"
            nChange={handleInput}
         />
         // ...
         ~~~
         Estamos omitiendo el manejo del password porque eso es de otro curso.
3. Creamos la funcion que se encagara de enviar los cambios.
   - Cramos la funcion handleSubmit y dentro eliminamos la funcionalidad por defecto de html para el envio de formularios.
   ~~~
   const handleSubmit = event => {
      event.preventDefault();
      console.log(form);
   }
   ~~~
   El console.log es para comprobar que si envia los datos. Aqui dontro se pone la logica para enviarlos.
   - En la etiqueta form, en el onSubmit incluimos esta funcion.
   ~~~
   <form className="login__container--form" onSubmit={handleSubmit}>
   ~~~
#### Formulario de Login con Redux
Con esta funcionalidad mandamos los datos recojidos con el formulario.
1. Conectamos el Login componen y creamos los action y reducer. ('LOGIN_REQUEST'). Con el fin de tener el objeto user al final de todo cuando se envien los valores.
2. Implementamos el action dentro de handleSubmit.
3. Redirecionamos la pagina al Home con la ayuda de history y su metodo push. Este esta incluido ya que el proyecto esta envielto en el BrowserRouter.
   ~~~
   props.history.push('/');
   ~~~
Con esto tenemos todo el login connectado al store y podemos enviar el objeto ('form' generado por el react hooks) a una variable 'user' dentro de este.
#### Creando un Servicio para Gravatar
Muchas veces la mejor opción no es descargar un paquete de npm ya que podemos ver la documentación, entender cómo funciona y nosotros implementar el código necesario para nuestro caso, ya que instalar todo el paquete puede volver más pesado nuestro proyecto.
Para nuestro servicio que llamará a Gravatar vamos a crear la carpeta utils y dentro añadir el archivo gravatar.js.
2 finalidades:
- La primera nos permite entender como no debemos de depender de paquetes de terceros solo por que los necesitamos en nuestro proyecto.
- Segunda, nos permite añadirle una imagen al proyecto cuando iniciamos sesión. Gravatar es un servicio que sirve para las imágenes de perfil asociadas a un correo electrónico, muchas páginas utilizan Gravatar en lugar de un servidor propio para jalar esa información.
#### Uso de gravatar en nuestro proyecto
Esto nos permite poner la imagen de usuario en donde esta el logo de iniciar seccion. Para implementarla conectamos Header al store para pedirle la info de 'User', informacion que almacenamos desde login cuando le damos en iniciar sesion, luego usamos la funcion gravatar que creamos para pedir la url de la imagen a la pagina de gravatar y directamente la ponemos en src de la etiqueta img.
Para este ejemplo usamos una validacion para poner la imagen de gravatar o el logo de login si no se ha iniciado sesion.
Aprovechando la validacion del logo/imagen-perfil, creamos una validacion para que se muestre el nombre de usuario si se inicio sesion y que no se muestre el link de iniciar sesion del header.
   ~~~
   <div className="header__menu">
      <div className="header__menu--profile">
         {hasUser 
            ? <img src={gravatar(user.email)} alt={user.email} />
            : <img src={userIcon} alt="" />
         }
         <p>Perfil</p>
      </div>
      <ul>
         {hasUser 
            ? <li><a href="/">{user.email}</a></li>
            : null
         }
         {hasUser
            ? null
            : <li>
               <Link to="/login">
                  Iniciar Sesión
               </Link>
            </li>
         }
      </ul>
   </div>
   ~~~
#### Validación para LogIn LogOut
Para validar el lo que hacemos es crear el action y reducer que se encargaran de borrar el usuario de la variable user que se crea en el store cuando se inicia sesion (Pasamos un {} objeto vacio). Para el boton de cerrar sesion con una etiqueta a en el onClick usamos el action.
   ~~~
   {hasUser
      ? <li>
            <Link
               to="#logout"
               onClick={handleLogout}>
               Cerrar sesion
            </Link>
         </li>
      : <li>
         <Link to="/login">
            Iniciar Sesión
         </Link>
      </li>
   }
   ~~~
#### Register
Incluimos la logica para el formulario de registro maneje los datos del formulario con hooks, estos sean almacenados en una variable form para poderlos usarlos mejor.
#### Register con Redux
Implementamos redux dentro del Register Component para que de esta manera los datos sean enviados al store y puedan ser usados por los demas componentes.
#### Vista general del player
1. Creamos Player.jsx dentro de containers. Creamos la logica de estructura y scss de nuestro player.
   ~~~
   import React from 'react';
   import { Link } from 'react-router-dom';
   import '../assets/styles/components/Player.scss'

   const Player = () => {
      return (
         <div className="Player">
            <video controls autoPlay>
               <source src="" type="vidoe/mp4" />
            </video>
            <div className="Player-back">
               <Link to="/">
                  <button type="button">
                     Regresar
                  </button>
               </Link>
            </div>
         </div>
      );
   }

   export default Player;
   ~~~
2. En routes añadimos una nueva ruta para nuestro player y le pasamos un id (es decir, una propiedad a nuestra ruta).
   ~~~
   <Route exact path="/player/:id" component={Player} />
   ~~~
3. Hacemos Link al icon de play que se encuentra en carousel Item.
   ~~~
   <Link to={/player/${id}}>
      <img
         className="carousel-item__details–img"
         src={playIcon}
         alt=“Play Icon”
      />
   </Link>
   ~~~
De esta manera creamos una url por cada uno de los elementos que se esta iterando.
#### Arreglando la funcionalidad del player
Lo que hicimos antes fue enviar a nuestro player un id que se obtiene del render que se hace de los elementos para cada uno de los items del carousel y de esta manera transmitimos el id a nuestra url y ahi capturamos este valor para saber cual es el video que corresponde a ese id y poder presentarlo en el reproductor.
   - En el boton del item.
   ~~~
   <Link to={`/player/${id}`}>
   ~~~
   - En el route de las rutas.
   ~~~
   <Route exact path="/player/:id" component={Player} />
   ~~~
1. En el boton agregamos la funcion que nos regresará a la pagina de donde veniamos, esta funcion esta encapsulada en el browser router.
   ~~~
   <button type="button" onClick={() => props.history.goBack()}>
   ~~~
2. Debemos reparar el compilado cuando cargamos la ruta de un video directamente porque no lo lee por defecto el bundle.js. No lo encuentra en la ruta desde donde esta ya que si llamamos la ruta del video directamente, tomara esta ruta como la principal y buscara en esta el bundle.js. Por lo tanto en webpack en output agregamos esta  confiuguracion que nos dice que lo lea en el publicPath.
   ~~~
   // ...
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/', // <--- Esta linea.
   },
   resolve: {
      extensions: ['.js', '.jsx'],
   },
   // ...
   ~~~
3. En el componente player debemos obtener el id que recibimos por parametros
   ~~~
   const { id } = props.match.params;
   ~~~
Esto lo hace Router en el momento que nosotors generamos la ruta player:id, de esta manera obtenemos el id desde los props para poder usar este y buscar el video luego.
#### Terminando de detallar nuestro player
En esta clase incluimos la logica necesario para reproducir el video. Este viene desde una api, por lo tanto necesitamos la url de cada video, estas url las tenemos en el json de initialState. 
1. Por medio de redux, pedimos el stado de playing para ver si tenemos, o no, un video incluido, o sea, un video en reproducion (Creamos action "getVideoSource" y reducer).
2. Pasamos la url de este video que se encuentra en el campo source al src del video para que se muestre en pantalla.
   ~~~
   <video controls autoPlay>
      <source src={props.playing.source} type="video/mp4" />
   </video>
   ~~~
3. Validamos que hay video dentro del api/initialState/json, mostrando el NotFound component si no existe o el player component de lo contrario.
   ~~~
   // ...
   const hasPlaying = Object.keys(props.playing).length > 0;

   return hasPlaying ? (
      <div className="Player">
         <video controls autoPlay>
            <source src={props.playing.source} type="video/mp4" />
         </video>
         <div className="Player-back">
            <button type="button" onClick={() => props.history.goBack()}>
               Regresar
            </button>
         </div>
      </div>
   ) : <NotFound />;
   // ...
   ~~~
4. Buscamos el id dentro de la api/initialState/json/store y lo incluimos al playing, esto porque al entrar en esta pagina el objeto playing esta basio ya que no tenemos la logica para que se agrege al precionar el boton play en el item. Cuando lo encuentre por medio del action "getVideoSource" y su reducer lo incluimos al playing en el store.
   - En Player component.
   ~~~
   const hasPlaying = Object.keys(props.playing).length > 0;

   useLayoutEffect(() => {
      props.getVideoSource(id);
   }, []);

   return hasPlaying ? (
   ~~~
   Usamos useLayoutEffect de 'react', ya que este se ejecuta de maner sincrona. Lo que impide que mientras busqua el video y lo carga se vea el NotFound component ya que se sigue ejecuntando el codigo de no usar useEffect que es asincrono.
   - En reducer.
   ~~~
   case 'GET_VIDEO_SOURCE':
      return {
         ...state,
         playing: state.trends.find(item => item.id === Number(action.payload))
            || state.originals.find(item => item.id === Number(action.payload))
            || [],
      }
   ~~~
   De esta manera buscamos en trends y en original si esta el id, y si esta en alguno, que lo establesca en playing, de lo contrario retornamos un [].
#### Validaciones del header.
Validamos la clase que va a tener el header dependiendo de de la ubicacion de donde se llama (Login, Register o Home). De esta manera le podemos poner el color necesario para que quede bien. Esta clase se establece con un paquete llamado "classnames". Con este paquete se valida un booleano y se establese un string con el nombre de la variable buleano para que sea pasado a la clase del header.
   ~~~
   import classNames from 'classnames';
   // ...
   const headerClass = classNames('header', {
      isLogin,
      isRegister,
   });

   return (
      <header className={headerClass}>
         <Link to="/">
            <img className="header__img" src={logo} alt="Platzi Video" />
         </Link>
   // ...
   ~~~
   Solo Las variables que sean true se estableceran en el string "headerClass". Ya con esto solo se usaria el Header fuera de Layout component y en cada componente se usaria con el booleano necesario.
#### Validaciones de UI
Agregamos validaciones para la clase del input del componente Search ya que si lo colocamos sin validacion entra en conflicto con los otros input poniendoles esta clase. La validacion es solo para el Home "isHome" se pasa como booleano al Search component y de esta manera con classnames se puede establecer esta clase para asignarle el width necesario.
#### Debug con Redux Devtools
Para una mejor forma de ver como redux esta manejando los estados de la app esta herramienta es una buena opcion.
1. En el index principal donde se crea el store, creamos una constante que le pasaremos a la funcion que crea el store.
   ~~~
   // ...
   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
   const store = createStore(reducer, initialState, composeEnhancers);

   ReactDOM.render(
   // ...
   ~~~
2. Instalamos la extencion en el navegador (Redux Devtools).
###### Reto de Serach component.
1. Cree un action y un reducer que se encargan de llenar un arreglo "search" dentro del store con los item que coinciden con la busqueda.
   ~~~
   case 'SEARCH_REQUEST':
      if(action.payload === ''){
         return {
            ...state,
            search: [],
         };
      }
      const list = [...state.trends, ...state.originals];
      return {
         ...state,
         search: list.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()))
            || [],
      }
   ~~~
   - Valido que el valor que pasamos en la busqueda contenga informacion ya que si esta vacio mantiene el ultimo cambio.
3. Dentro de una funcion "handleSearch" manejo los datos del input con ayuda del onChange del input y envio los datos al store con ayuda del action.
   ~~~
   const handleSearch = event => {
      props.searchRequest(search);
   }
   ~~~
4. En Home valido que el arroglo search del store esta o no vacio. Si este contien valores muestro solo los items de este con el titulo de resultado, de lo contrario muestro las listas que ya se incluyen.
   ~~~
   const Home = ({ myList, trends, originals, search }) => {
   // ...
   const isSearch = search.length > 0;
   // ...
   <Search isHome />
   {isSearch
   ? <Categories title="Resultado" >
      <Carousel >
         {search.map(item => 
         <CarouselItem key={item.id} {...item} />
         )}
      </Carousel>
   </Categories>
   : categories.map((categorie, i) => list[i]?.length > 0 &&
   //...
   originals: state.originals,
   search: state.search, // Dentro de mapStateToProps();
   //...
   ~~~