// Instalamos express y dotenv. De momento el segundo no se usa.
// Importamos express.
import express from "express";
// Importamos las configuraciones para usar las variables de entorno.
import config from "./config";

// Extraemos solo las variables de entorno que vamos a usar.
const { env, port } = config;
// Creamos la app de express para los llamados GET y demas.
const app = express();

// Esta validacion es para ver si la variable de entorno env funciona
// y la usa para lanzar en modo desarrollo.
if (env === "development") {
  console.log("Development config");
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
