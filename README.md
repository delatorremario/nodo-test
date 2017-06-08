# Test NODO
Prueba Técnica de Nodo - Node.js

## Recomendaciones

* Lee todos los desafíos antes de comenzar. Entiende el problema completo para luego resolver punto a punto.
* Ver todos los archivos y módulos del proyecto para familiarizarse con las rutas y puntos de edición.
* Los problemas tienen una lógica incremental. Es recomendable ir haciéndolos en orden.
* Puedes importar cualquier librería que pueda ser de ayuda para tu solución (npm).
* Luego de completar un módulo de respuesta, sube tu avance en un commit con el título y/o descripción de lo realizado.
* No hay restricción de IDE.

## Requisitos

* [Node.js >= 6.9.4](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/) corriendo en mongodb://localhost
* Se debe ocupar [Mongoose](http://mongoosejs.com/) para interactuar con MongoDB

## Para comenzar

Debes hacer un fork del proyecto, para luego hacer un pull-request de tus respuestas al repositorio original.

```sh
git clone https://github.com/../nodo-test.git
cd nodo-test
```

Debes instalar las dependencias:

```sh
npm install
```

Y ejecutar la aplicación:

```sh
node app.js
```

Si ingresan a [http://localhost:3000/](http://localhost:3000/) verán una visualización de nodos en un grafo de fuerzas, que será la base de esta prueba.


## Proyecto: Grafo de Fuerzas

El desafío consiste en poblar, obtener y mapear datos de usuarios dummy, para entregar un objeto en el formato requerido por esta visualización, y así crear un grafo de relaciones entre los User de la BD.
Como se señala más arriba, los desafíos van en orden incremental, por lo que es recomendable no alterar esto.

> No olvides leer todos los desafíos antes de comenzar


## Explicación de los desafíos

### 1. Modelo de Usuario
* En la carpeta `models/`, encontramos el archivo User.js. Este es el modelo de Usuario que será la base del proyecto.
* Debes agregar los campos y métodos de clase necesarios para el funcionamiento posterior de la aplicación.
> Es necesario comprender el desafío 2 para comenzar el desarrollo de este ítem

### 2. Script para poblar la BD
* En la carpeta `utils/`, encontramos un script para poblar la BD. Este script, luego de estar listo, debe ser ejecutado:

```sh
cd utils
node populate_db.js
```

* Se debe crear un script (autoseed) que traiga usuarios dummy desde el servicio [API Random User Generator](https://randomuser.me/). La documentación se puede encontrar [AQUÍ](https://randomuser.me/documentation).
* No es necesario que el modelo soporte todos los campos, si no **al menos 5 campos significativos, incluyendo nombre y foto**, ya que serán necesarios para la visualización de datos final.
* El script debe validar que **no se carguen más de 50 usuarios en la BD**. Si ya se alcanzó esa cuota, no debe poder cargar más (*inclusive si vuelvo a correr el script*).

> HINT: Está importado el módulo 'http' que puede ser de ayuda

* Luego de comprender la estructura de los usuarios que trae este Web Service, se puede consolidar el modelo de User (primer desafío).

### 3. Mapear formato JSON para grafo de fuerzas
* Dado que ya tenemos cargada la BD con **50** usuarios, vamos a generar un JSON con el formato que requiere la visualización.

Al iniciar el servidor, se darán cuenta que automáticamente en el **index** carga un grafo de fuerzas. Esto es posible ya que importa un test JSON que se encuentra en `public/json/dummy.json`.
El flujo de carga de los datos es:

* I) El código de inicialización de D3 llama a la ruta */tree_data*

`public/js/init.js`
```javascript
d3.json('/tree_data', function(error, graph) {
  ...
)};
```

* II) Esta ruta retorna un JSON con cierto formato definido. Ese formato tiene una lógica relacional para generar los enlaces (se puede ver *dummy.json* como ejemplo).

* El objetivo de este desafío es consultar los usuarios de la BD, mapearlos a un JSON con el formato establecido para así generar un grafo de usuarios:

```javascript
{
  "nodes": [
    {"id": "Myriel", "group": 1},
    {"id": "Napoleon", "group": 1},
    {"id": "Mlle.Baptistine", "group": 1},
    {"id": "Mme.Magloire", "group": 1},
    {"id": "CountessdeLo", "group": 1}
  ],
  "links": [
    {"source": "Napoleon", "target": "Myriel", "value": 1},
    {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
    {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
    {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
    {"source": "CountessdeLo", "target": "Myriel", "value": 1}
  ]
}   
```
* La lógica de este formato es **declarar los nodos con sus ids, para luego declarar los enlaces *source-target* de acuerdo a sus ids**. El atributo `group` define el color por cluster, y `value` define el grosor de la línea de enlace.
> HINT: Los ids pueden ser `String` o `Int`

* **El desafío es generar un algoritmo en el método `GET /tree_data` que arme el JSON, declarando los nodos (Users de la BD) y declarando los links de forma aleatoria (generar links aleatorios, todos los `User` deben tener al menos 3 enlaces con otros `User`)**

> HINT 2: No se evaluarán conocimientos de D3. Para la realización de este desafío no es necesario que alteren el script de inicialización del grafo presente en `public/js/init.js`.

> HINT 3: Está cargado el módulo `lodash` en `routes/api.js`, que puede ser de ayuda para recorrer elementos de una colección.


### 4. Mostrar información del User onClick de un círculo
* Finalmente, en el fondo del archivo `public/js/init.js`, encontramos un método jQuery para manejar el click sobre un elemento `circle`.

* En este último desafío, se deben implementar 2 cosas:

**1. Ruta `GET users/:id` que se encuentra en `routes/api.js`. Debe devolver en formato JSON el User(:id)** 

**2. Desde el handler de click de `circle`, obtener el ID del User, hacer el request a la API y mostrar de alguna forma la información del Usuario. Puede ser en consola, una tabla que se actualice, una lista de elementos en la vista o cualquier otra opción. (*Es un bonus si muestran la foto de perfil de alguna forma gráfica*)**

> HINT: Los elementos `circle` del DOM tienen en *al menos 2* atributos el ID propio expuesto


## LA PRUEBA NO TIENE LÍMITE DE TIEMPO, AUNQUE CUALQUIER ENTREGA POR SOBRE LAS 4 HORAS SERÁ EVALUADA DE FORMA MÁS RIGUROSA

# ¡ÉXITO!
