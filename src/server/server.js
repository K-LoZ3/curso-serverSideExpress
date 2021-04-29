// Instalamos express y dotenv. De momento el segundo no se usa.
// Importamos express.
import express from "express";
// Importamos las configuraciones para usar las variables de entorno.
import config from "./config";
// Importamos webpack para configurar los 2 middleware de webpack.
import webpack from 'webpack';

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
}

// Con esta funcion incrustamos el html renderizado de react como un string y lo incrustamos en
// el template del html que se mostrara al final en el navegador.
const setResponse = (html, preloadedState) => (`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="assets/app.css" type="text/css">
      <title>P Video</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="assets/app.js" type="text/javascript"></script>
    </body>
  </html>
`);
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
  res.send(setResponse(html, preloadedState));
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
