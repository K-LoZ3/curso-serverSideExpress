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