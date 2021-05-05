#### Creamos el servidor.
Dentro de 'src' creamos los archivos para el servidor (index.js, server.js).
##### Configuraciones necesarias.
- instalamos con npm babel para el servidor y tambien espress y dotenv.
   ~npm i @babel/register -D~ y ~npm i express dotenv~
- En package.json incluimos el script para ejecutar el servidor.
   ~~~json
   "start:dev": "node src/server/index"
   ~~~
- Instalamos nodemon como dependencia de desarrollo. ~npm i nodemon -D~
- Cambiamos 'node' por 'nodemon' en el script 'start:dev' para que los cambios en el servidor se vean reflejados automaticamente.
#### Variables de entorno.
Creamos un archivo .env en la reiz del proyecto donde pondremos las variables de entorno. Estas variables Estaran en mayusculas y su valor si puede ir en minusculas. Tambien un .env.example que contendra las variables sin sus valores ya que .env no ira al repositorio y debemos informar cuales son estas variables.
- Creamos una carpeta config y dentro in index.js para las configuraciones que de momento son de las variables de entorno.
#### Integrando webpack y express.
- Instalamos las dependencias necesarias. ~npm ins
tall webpack-dev-middleware webpack-hot-middleware react-hot-loader -D~
- Lo segundo es verificar si webpack ya esta instalado. Si lo esta como dependecia de desarrollo lo debemos desinstalar para instalarlo como una dependencia de produccion.
   - Borramos webpask del package.json y hacemos un ~npm install~ luego instalamos webpack. ~npm install webpack~
- En el webpack.config.js agregamos el plugin ~new webpack.HotModuleReplacementPlugin(),~ Para que use todo lo configurado.
- Corregimos la ruta de entrada en el webpack.config.js para que busque el archivo index del frontend en la carpeta nueva quedando asi. ~'./src/frontend/index.js'~ Luego incluimos este mismo dentro de un objeto para pasarle otra entrada la cual sera la configuracion para el hot middleware quedando asi.
~~~js
entry: ['./src/frontend/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'],
~~~
- Expecificamos el modo desarrollo dentro del webpack.config.js
- En la configuracion de babel agregamos un apartado para plugins. En este pondremos el loader de react quedando de la siguiente manera.
   ~~~json
   "plugins": ["react-hot-loader/babel"]
   ~~~
#### Servir react con express.
Las configuraciones son:
1. Como el servidor se encargara de responder con el html ya no necesitamos el plugin de html en el webpack.config.js asi que lo eliminamos.
2. Cambiamos el nombre que resulta del css en el plugin del webpack para que este sea el mismo y poder usarlo en el servidor. Lo mismo con el output del js en webpack.config.js quedando asi.
~filename: 'assets/app.css',~ y ~filename: 'assets/app.js',~
#### Agregamos rutas para el manejo del frontend.
- Para el manejo de rutas instalamos 2 dependencias. ~npm i history react-router-config~
El primero es para tener un historial de las rutas y el segundo es para añadir una capa de configuracion a las rutas.
#### Cargar imagenes.
Intalamos ~~~npm install asset-require-hook~~~
#### Hydrate
Con hydrate en vez de render lo que hacemos es que no renderice 2 veces, ya que la app la estamos renderizando en el servidor y estamos creando el store y el html en el servidor. Esto para mandar el html y el css al cliente antes de que frontend este listo. En este sentido lo que hacemos es cargar todo lo necesario en el servidor y mandarlo al navegador cuando el cliente ya tenga lo demas no necesitara re-renderizar solo tendra que hacer un hydrate para que agregue lo que falta, como lo es el js.
#### Configurando el servidor para produccion.
Creamos una carpeta public en la carpeta server, ya que es esta se incluira todo el bundle de la aplicacion.
- Instalamos helmet ya que este sirve para la seguridad de la app ~~~npm i helmet~~~.
- Agregamos la nueva carpeta public al .gitignore para que no se suban los assets ni bundles que generamos.
#### Configuramos webpack para produccion
- Cambiamos el script build del package.json para produccion. Lo que hacemos es pasarle el mismo archivo de configuracion que estamos usando.
   ~~~json
   "build": "webpack-cli --config webpack.config.js",
   ~~~
- Eliminamos el script start ya que al servir nuestra app de frontend desde el servidor ya no nesesitamos esto.
- Configuramos webpack con ayuda de dotenv. Esto lo hacemos importando dotenv y ejecutando su funcion config dentro del archivo webpack.config.js.
   ~~~js
   require('dotenv').config();
   ~~~
- Cambiamos la ruta del output ya que queremos que el bundle quede en la carpeta public que esta en server.
   ~~~js
   ouput: {
      path: path.resolve(__dirname, 'src/server/public'),
      // ...
   }
   ~~~
- Cambiamos el modo para que este este ligado a la variable de entorno.
   ~~~js
   mode: process.env.ENV,
   ~~~
- Declaramos una constante isDev para que valide si estamos en modo desarrollo para tomar desiciones a lo largo del archivo.
   ~~~js
   const isDev = (process.env.ENV === 'development');
   ~~~
- Con lo anterior nos ayudamos para no cargar el webpack-hot-middleware ya que no lo necesitamos en produccion. Asi que verificamos si eestamos en desarrollo y si es asi hacemos push al entry del webpack-hot-middleware.
   ~~~js
   const entry = ['./src/frontend/index.js'];
   if(isDev) {
      entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true');
   }
   
   module.exports = {
      entry, // Equivalente a entry: entry,
      mode: process.env.ENV
   }
   ~~~
- Validamos tambien si ejecutamos el plugin del hotModuleReplecement ya que tampoco es necesario para produccion.
   ~~~js
   isDev ? webpack.HotModuleReplacementPlugin() : () => {},
   ~~~
- Cambiamos en el .env la variable ENV para verificar si al poner produccion este toma las nuevas configuraciones.
#### Optimización del Build
Primero verificamos que no se esten llamanto loaders de mas. Como el de htlm que borraremos.
- Instalamos compression-webpack-pluging para comprimir todo el bundle. Lo usamos el webpack.config pero solo si estamos en produccion. Le indicamos que archivos va a comprimir y cual sera el nombre del archivo resultante.
- Instalamos tercer para minificar el js.
~~~npm i terser-webpack-plugin -D~~~
Lo usamos en webpack.config y lo que hacemos es en la parte de optimizacion agregamos la configuracion necesaria.
   ~~~js
   optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
   },
   ~~~
#### Aplicar hashes al nombre de nuestros builds
para esto modificamos el filename del output si estamos en modo produccion y lo mismo para el outpue de css. Agregamos un hash si es produccion.
- Instalamos webpack-manifest-plugin.
~~~npm i webpack-manifest-plugin~~~ para crear un manifiesto de los archivos que se generan en la carpeta public. Esto solo lo usaremos para produccion, asi que lo importamos en webpack.config y validando si es produccion lo usamos en la parte de plugins.
Esto crea un archivo manifest.json en la carpeta public.
Para usarlo y leerlo creamos un funcion en un archivo server/getManifest.js que se encargara de leerlo y usarlo.
#### Vendorfile con webpack
Con vendor lo que hacemos es separar la logica del programa de los archivos que estamos importando. De esta manera quedan estos en un archivo unico.