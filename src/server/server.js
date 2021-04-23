// Instalamos express y dotenv. De momento el segundo no se usa.
// Importamos express.
import express from 'express';

// Creamos la app de express para los llamados GET y demas.
const app = express();

// Hacemos una peticion get en la que se incluyen todas la rutas.
// ya sea '/' o '/otra-ruta'
app.get('*', (req, res) => {
  // Respondemos con un json.
  res.send({
    hello: 'express',
  });
});

// Lansamos la app de expres en el puerto 3000.
app.listen(3000, (err) => {
  // Validamos el error y si es asi lo mostramos o mostramos
  // en puerto en el que se lanzo el servidor.
  if (err) console.log(err);
  else console.log('Server running on port 3000');
});