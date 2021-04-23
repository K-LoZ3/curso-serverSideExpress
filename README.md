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