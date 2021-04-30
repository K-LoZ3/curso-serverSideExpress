// Instalamos express y dotenv. De momento el segundo no se usa.
// Importamos express.
import express from "express";
// Importamos las configuraciones para usar las variables de entorno.
import config from "./config";
// Importamos webpack para configurar los 2 middleware de webpack.
import webpack from 'webpack';
// Importamos para usar los middleware de seguridad que tiene.
import helmet from 'helmet';

import React from 'react'; // Importamos para poder usar jsx.
import { renderToString } from 'react-dom/server'; // Importamos para tranzformar jsx a string y poder insertarlo en template de html.
import { Provider } from 'react-redux'; // Importamos para poder tener el store dentro del html que vamos crear con rect.
import { createStore } from 'redux'; // Importamos para crear el store que usa el frontend y poderlo incluir en el html que enviaremos por GET.
// Importamos para renderizar las rutas del lado del servidor.
// Con esto no tenemos que definir cada ruta como se hace en el archivo '../frontend/routes/App.js'.
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes'; // Importamos las rutas para renderizarlas del lado del servidor.
import reducer from '../frontend/reducers'; // Importamos para crear bien el store.
import initialState from '../frontend/initialState'; // Importamos para crear bien el store.
import getManifest from './getManifest';

// Extraemos solo las variables de entorno que vamos a usar.
const { env, port } = config;
// Creamos la app de express para los llamados GET y demas.
const app = express();

// Esta validacion es para ver si la variable de entorno env funciona
// y la usa para lanzar en modo desarrollo.
if (env === "development") {
  console.log("Development config");
  // Definimos la configuracion de webpack dentro de una constante.
  const webpackConfig = require('../../webpack.config');
  // Importamos los middleware de webpack.
  const webpackDevWiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  // Definimos el compiler. Nos ayudara a compilar la configuracion de webpack.
  // Weabpack se puede usar como una funcion para cargar la configuracion desde el archivo.
  const compiler = webpack(webpackConfig);
  // Creamos un objeto de configuracion de webpack para usarlo con el middleware.
  // En este objeto se pasa el puerto donde se escucha la app y el hot: true es para decirle
  // a la configuracion que estamos usando el hotModeReplacemen de webpack.
  // Para eso el middleware hot de webpack. Esta configuracion son en el webpackDevMiddleware.
  const serverConfig = { port: port, hot: true };

  // Usamos los middleware. El primero es para configurar webpack en el servidor en modo desarrollo.
  // El segundo es para el hotModeReplacemen (El compilado automatico con los cambios).
  app.use(webpackDevWiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else { // Modo de produccion
  // Creamos un middleware que leera el manifest.json
  app.use((req, res, next) => {
    // Creamos esta variable con el manifest.json pero solo si no lo hemos hecho antes.
    if (!req.hashManifest) req.hashManifest = getManifest();
    // Pasamos al siguiente middleware.
    next();
  })
  // Para que en produccion use esta carpeta publica.
  // Ya que es esta en donde se gurdara todo el bundle.
  app.use(express.static(`${__dirname}/public`));
  // Ya con esto usamos todos los middleware/configuraciones que helmet nos da.
  // Podemos usar esto para que no se preocupe por cosas como el origen del contenido.
  // Imagenes, videos y demas.
  /* app.use(helmet({
    contentSecurityPolicy: false,
  })); */
  // O esta otra forma para decirle de donde vienen estos contenidos.
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'sha256-Ti4FnS55L6EFT/nMP6BPeiOTZ7S0zoQ3/npnTXsjH9M='"],// No se a que se refiere esta.
        'img-src': ["'self'", 'http://dummyimage.com'],
        'style-src-elem': ["'self'", 'https://fonts.googleapis.com'],
        'font-src': ['https://fonts.gstatic.com'],
        'media-src': ['*'],
      },
    }),
  );
  // Esta es importante porque desabilitamos la cabecera que tiene la informacion del servidor del que
  // Nos estamos conectando, asi ocultamos esta informacion en produccion y evitamos ataques dirigidos.
  app.disable('x-powered-by');
}

// Con esta funcion incrustamos el html renderizado de react como un string y lo incrustamos en
// el template del html que se mostrara al final en el navegador.
// Este script se seguira viendo en el source del html del navegador.
// Si quieres eliminar el script puedes asignarle un id y en lo que se monte el cliente eliminas del DOM el script.
const setResponse = (html, preloadedState, manifest) => {
  // Usamos manifest para obtener el nombre del archivo con los hashes generados para ponerlos en el html tal cual.
  // Con esta validacion lo que hacemos es verificar primero si fue leido el archivo. de lo contrario usa el archivo anterior.
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';

  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${mainStyles}" type="text/css">
        <title>P Video</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="${mainBuild}" type="text/javascript"></script>
      </body>
    </html>
  `);
}
// El script es para poder pasar el preloadState para que el frontend pueda acceder y usarlo.

// Con esta funcion convertimos todos los componentes de react en el frontend como un string
// De esta manera los podemos pasar a un html y enviarlo como un string por una peticion GET
const renderApp = (req, res) =>{
  // Necesitamos el store ya que es necesario tener el estado inicial y todo lo demas
  // pero no vamos a usar react-devtool del lado del servidor asi que solo pasamos los 2 promeros argumentos.
  // Esto es porque nocesitamos que el html quede igual como quedaria con el frontend normal.
  const store = createStore(reducer, initialState);
  // Con esto lo que hacemos es crear una copia o un estado ya cargado del store para poder pasarlo al frontend
  // y que use este mismo y no cree uno nuevo.
  const preloadedState = store.getState();
  // Renderizamos el html que vamos a usar.
  // Provider para el store, staticRouter para el manejo de las rutas y renderRoutes para que renderice
  // el objeto de rutas del servidor para que sepa cuales y como usarlas.
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>,
  );
  
  // Enviamos el html al navegador. Tambien enviamos el precargado del store.
  // Pasamos el hashMinifest desde el req ya que con el middleware anterior creamos esa variable.
  // Como ahora la podemos usar la pasamos para usarla en el html para decirle como se llaman los
  // archivos ahora que tienen hashes.
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

// Hacemos una peticion get en la que se incluyen todas la rutas.
// ya sea '/' o '/otra-ruta'.
// Cambiamos el GET. Ya que tenemos una funcion que envia la respuesta al navegador
// Solo necesitamos poner esa funcion como parametro.
app.get("*", renderApp);

// Lansamos la app de expres en el puerto que defnimos en
// la variable de entorno.
app.listen(port, (err) => {
  // Validamos el error y si es asi lo mostramos o mostramos
  // en puerto en el que se lanzo el servidor.
  if (err) console.log(err);
  else console.log("Server running on port", port);
});
