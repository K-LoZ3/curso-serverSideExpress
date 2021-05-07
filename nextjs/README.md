#### Implementando next.js
Con next js podemos crear un servier side render de una manera muy facil y rapida. Solo devemos instalar next react y react-dom.
~~~js
npm i react react-dom next
~~~
Creamos la carpeta y la inicializamos con npm init. Luego es simple. En los scripts ponemos los 3 que son de next.
~~~json
"dev": "next",
"build": "next build",
"start": "next start"
~~~
Debemos crear una carpeta pages que tendra las paginas de la app. En esta todos los archivos que esten aqui seran una estructura nueva. O sea, el nombre del archivo sera la ruta de esa estructura.