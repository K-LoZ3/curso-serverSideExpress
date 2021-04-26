// Instalamos express y dotenv. De momento el segundo no se usa.
// Importamos express.
import express from "express";
// Importamos las configuraciones para usar las variables de entorno.
import config from "./config";
// Importamos webpack para configurar los 2 middleware de webpack.
import webpack from 'webpack';

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

// Hacemos una peticion get en la que se incluyen todas la rutas.
// ya sea '/' o '/otra-ruta'
app.get("*", (req, res) => {
  // Respondemos con un json.
  res.send({
    hello: "express",
  });
});

// Lansamos la app de expres en el puerto que defnimos en
// la variable de entorno.
app.listen(port, (err) => {
  // Validamos el error y si es asi lo mostramos o mostramos
  // en puerto en el que se lanzo el servidor.
  if (err) console.log(err);
  else console.log("Server running on port 3000");
});
