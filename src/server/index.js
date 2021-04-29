require('ignore-styles');

// Instalamos @babel/register para usarlo en el servidor.
// Lo cargamos con los presets para que tenga toda la funcionalidad
// necesaria para react. Esta dependencia se insatala como  desarrollo.
require('@babel/register')({
  presets: [
  "@babel/preset-env",
  "@babel/preset-react"
  ],
});

// Importamos el archivo server dentro de index.
require('./server');