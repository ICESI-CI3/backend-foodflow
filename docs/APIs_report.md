## Integrantes

* Juan Esteban Duque Taborda
* Sebastiaán Escobar Marín
* Juan Camilo Bernal

## Informe de Funcionalidades de la API

### Descripción General

La API proporciona endpoints para gestionar las ubicaciones, ingredientes, órdenes de abastecimiento (logística), productos, órdenes, menús y reportes de una organización. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre estas entidades, así como obtener detalles específicos de cada una y manejar posibles errores de manera adecuada.
Es clave mencionar que todos estos endpoint no son entidades como tal, quiere decir que no tienen una tabla en la base de datos, o que no se necesitan crear dentro de la aplicación.
Están separados de esta manera para no dejar a un módulo con más trabajo del que debe estar encargado. Los módulos que son solo de lógica de negocio son *menús* y *reportes*. Estos
lo único que hacen es acceder a la base de datos y traer datos existentes.

# Endpoints Disponibles
## 1. Sedes (Locations)

### Obtener Todas las Ubicaciones
* URL: GET /location
* Descripción: Devuelve todas las ubicaciones almacenadas en el sistema.
* Parámetros: No requiere parámetros.
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un arreglo de objetos JSON, cada uno representando una ubicación con sus detalles.
* Respuesta de Error: Código de estado HTTP 404 Not Found si no hay ubicaciones en la base de datos.

### Obtener Detalles de una Ubicación
* URL: GET /location/getOne/:id
* Descripción: Devuelve detalles específicos de una ubicación según su ID.
* Parámetros: :id (ID de la ubicación).
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un objeto JSON con los detalles de la ubicación solicitada.
* Respuesta de Error: Código de estado HTTP 404 Not Found si la ubicación con el ID especificado no existe.

### Crear una Nueva Ubicación
* URL: POST /location/create
* Descripción: Permite crear una nueva ubicación.
* Parámetros: Datos de la ubicación en el cuerpo de la solicitud (nombre, ubicación, etc.).
* Respuesta Exitosa: Código de estado HTTP 201 Created. Devuelve un objeto JSON con los detalles de la ubicación recién creada.
* Respuesta de Error: Código de estado HTTP 409 Conflict si ya existe una ubicación con el mismo nombre.

### Actualizar una Ubicación Existente
* URL: PUT /location/update/:id
* Descripción: Permite actualizar los detalles de una ubicación existente.
* Parámetros: :id (ID de la ubicación) en la URL y datos actualizados de la ubicación en el cuerpo de la solicitud.
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un objeto JSON con los detalles de la ubicación actualizada.
* Respuesta de Error: Código de estado HTTP 404 Not Found si la ubicación con el ID especificado no existe.

### Eliminar una Ubicación
* URL: DELETE /location/delete/:id
* Descripción: Permite eliminar una ubicación existente.
* Parámetros: :id (ID de la ubicación) en la URL.
* Respuesta Exitosa: Código de estado HTTP 204 No Content si la ubicación se elimina con éxito.
* Respuesta de Error: Código de estado HTTP 404 Not Found si la ubicación con el ID especificado no existe.

El controlador de esta entidad esta compuesto por el de *ingrediente* y *logística*, esto con que fin, pensamos que fuera así para que la persona solo pueda crear una orden de 
abastecimiento o ingrediente a través de sede, es decir, sin poder realizar estas operaciones desde ningun otro lado.

## 2. Ingredientes (Ingredients)

### Obtener Todos los Ingredientes
* URL: GET /location/ingredients
* Descripción: Devuelve todos los ingredientes almacenados en el sistema.
* Parámetros: No requiere parámetros.
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un arreglo de objetos JSON, cada uno representando un ingrediente con sus detalles.
* Respuesta de Error: Código de estado HTTP 404 Not Found si no hay ingredientes en la base de datos.

### Obtener Detalles de un Ingrediente
* URL: GET /location/ingredient/getOne/:id
* Descripción: Devuelve detalles específicos de un ingrediente según su ID.
* Parámetros: :id (ID del ingrediente).
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un objeto JSON con los detalles del ingrediente solicitado.
* Respuesta de Error: Código de estado HTTP 404 Not Found si el ingrediente con el ID especificado no existe.

### Actualizar un Ingrediente Existente
* URL: PUT /location/ingredient/update/:id
* Descripción: Permite actualizar los detalles de un ingrediente existente.
* Parámetros: :id (ID del ingrediente) en la URL y datos actualizados del ingrediente en el cuerpo de la solicitud.
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un objeto JSON con los detalles del ingrediente actualizado.
* Respuesta de Error: Código de estado HTTP 404 Not Found si el ingrediente con el ID especificado no existe.

### Eliminar un Ingrediente
* URL: DELETE /location/ingredient/delete/:id
* Descripción: Permite eliminar un ingrediente existente.
* Parámetros: :id (ID del ingrediente) en la URL.
* Respuesta Exitosa: Código de estado HTTP 204 No Content si el ingrediente se elimina con éxito.
* Respuesta de Error: Código de estado HTTP 404 Not Found si el ingrediente con el ID especificado no existe.

En este caso solo existen cuatro métodos en el controlador de *Sede*, esto ya que un ingrediente solo se crea cuando se crea una orden de abastecimiento, es decir, por
parámetro se pasan los ingredientes. Esto porque la orden de abastecimiento indica cuanto se compró de cada ingrediente, por lo que ninguna persona podría añadir o crear ingredientes
que no hayan sido comprados. Pero claramente, el servicio de ingrediente si tiene un método que me permite crear ingredientes, pero también tiene uno extra en el que se valida
si es un ingrediente nuevo o existente, para así mismo actualizar su cantidad o crearlo.

## 3. Órdenes de Abastecimiento (Logística)

### Obtener Todas las Órdenes de Abastecimiento
* URL: GET /location/logistic
* Descripción: Devuelve todas las órdenes de abastecimiento almacenadas en el sistema.
* Parámetros: No requiere parámetros.
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un arreglo de objetos JSON, cada uno representando una orden de abastecimiento con sus detalles.
* Respuesta de Error: Código de estado HTTP 404 Not Found si no hay órdenes de abastecimiento en la base de datos.

### Obtener Detalles de una Orden de Abastecimiento
* URL: GET /location/logistic/getOne/:id
* Descripción: Devuelve detalles específicos de una orden de abastecimiento según su ID.
* Parámetros: :id (ID de la orden de abastecimiento).
* Respuesta Exitosa: Código de estado HTTP 200 OK. Devuelve un objeto JSON con los detalles de la orden de abastecimiento solicitada.
* Respuesta de Error: Código de estado HTTP 404 Not Found si la orden de abastecimiento con el ID especificado no existe.

### Crear una Nueva Orden de Abastecimiento
* URL: POST /location/logistic/create
* Descripción: Permite crear una nueva orden de abastecimiento.
* Parámetros: Datos de la orden de abastecimiento en el cuerpo de la solicitud (nombre, ubicación, ingredientes, etc.).
* Respuesta Exitosa: Código de estado HTTP 201 Created. Devuelve un objeto JSON con los detalles de la orden de abastecimiento recién creada.
* Respuesta de Error: Código de estado HTTP 409 Conflict si ya existe una orden de abastecimiento con el mismo nombre.

Es aquí donde vemos la creación de ingredientes. Cuando se crea una órden de abastecimiento, se pasan los por parámetro ingredientes completos a usar.
Quiere decir que se pasan con sus atributos (nombre, precio, unidad de medida, cantidad, etc), ya dentro del controlador de *Sede*, primero manda los
ingredientes que se ingresaron en el *DTO* al servicio de la misma entidad para crearlos y añadirlos a la base de datos. Luego, en el mismo método, se dirigue al
servicio de *logística* para crear esta entidad asociando los ingredientes previamente creados. 

Estos métodos no están dentro del módulo *logística*, sino desde *Sede* por lo que explicamos anteriormente, y decidimos que la persona no pueda borrar ni editar una order
de abastecimiento porque esto le daría la capacidad de añadir o disminuir ingredientes a su gusto, sin realmente tenerlos en físico dentro de la tienda. 

## 4. Productos

### Obtener todos los productos
* GET /product
* Descripción: Obtiene todos los productos disponibles en la base de datos.
* Parámetros: Ninguno.
* Respuesta:
    * Código 200: Éxito. Devuelve una lista de productos.
    * Código 404: No encontrado. Si no hay productos en la base de datos.

### Obtener detalle de un producto
* GET /product/getOne/:id
* Descripción: Obtiene un producto específico por su ID.
* Parámetros:
    * id: ID del producto a buscar.
* Respuesta:
    * Código 200: Éxito. Devuelve el producto correspondiente al ID proporcionado.
    * Código 404: No encontrado. Si el producto con el ID dado no existe.

### Crear un nuevo producto
* POST /product/create
* Descripción: Crea un nuevo producto en la base de datos.
* Parámetros:
    * name: Nombre del producto.
    * description: Descripción del producto (opcional).
    * price: Precio del producto.
    * category: Categoría del producto (enum).
    * productToIngredient: Lista de ingredientes asociados al producto, con su respectiva cantidad.
* Respuesta:
    * Código 201: Creado. Devuelve el producto recién creado.
    * Código 409: Conflicto. Si ya existe un producto con el mismo nombre.

En este método, para crear un producto, se necesita si o si ingredientes, pero estos no se pasan por parámetro a este método, lo que se hace es que se pasa un arreglo de
*ProductToIngredient*, que es una entidad sin servicio ni controlador, que sirve, exclusivamente, para relacionar los ingredientes que tiene un producto, y cuanto se va a usar
de ese ingrediente, en dicho producto. 

### Actualizar el detalle de un producto
* PUT /product/update/:id
* Descripción: Actualiza un producto existente en la base de datos.
* Parámetros:
    * id: ID del producto a actualizar.
    * name: Nuevo nombre del producto.
    * description: Nueva descripción del producto.
    * price: Nuevo precio del producto.
    * category: Nueva categoría del producto.
* Respuesta:
    * Código 200: Éxito. Devuelve el producto actualizado.
    * Código 404: No encontrado. Si el producto con el ID dado no existe.

Este método solo deja actualizar los valores propios del producto, quiere decir que no permite modificar nada sobre los ingredientes, en cuanto si están relacionados con el producto
o no, porque los atributos de cada ingrediente solo se pueden modificar desde su mismo controlador, como ya se explicó.

### Añadir un ingrediente al producto
PUT /product/addIngredient/:id
* Descripción: Agrega ingredientes a un producto existente.
* Parámetros:
    * id: ID del producto al que se agregarán los ingredientes.
    * Cuerpo de la solicitud (JSON) con los nombres de los ingredientes y sus cantidades a agregar.
* Respuesta:
    * Código 200: Éxito. Devuelve el producto actualizado con los nuevos ingredientes agregados.
    * Código 404: No encontrado. Si el producto con el ID dado no existe.

### Borrar la relación de un ingrediente con un producto
* PUT /product/deleteIngredient/:id
* Descripción: Elimina ingredientes de un producto existente.
/ Parámetros:
    * id: ID del producto del que se eliminarán los ingredientes.
    * Cuerpo de la solicitud (JSON) con los nombres de los ingredientes a eliminar.
* Respuesta:
    * Código 200: Éxito. Devuelve el producto actualizado con los ingredientes eliminados.
    * Código 404: No encontrado. Si el producto con el ID dado no existe.

Estos dos métodos son los que permiten al administrador decidir si añade o elimina ingredientes que estén relacionados con dicho producto.

### Borra el producto completo, con sus relaciones incluidas
* DELETE /product/delete/:id
* Descripción: Elimina un producto existente de la base de datos.
* Parámetros:
    * id: ID del producto a eliminar.
* Respuesta:
    * Código 200: Éxito. Devuelve un mensaje indicando que el producto ha sido eliminado correctamente.
    * Código 404: No encontrado. Si el producto con el ID dado no existe.

Para este punto, ya deben haber ingredientes creados, ya que la relación de los ingredientes con el producto es creada por el mismo producto.

## 5. Órdenes

### Obtener todas las órdenes existentes
* GET /order
* Descripción: Obtiene todos los pedidos disponibles en la base de datos.
* Parámetros: Ninguno.
* Respuesta:
    * Código 200: Éxito. Devuelve una lista de pedidos.
    * Código 404: No encontrado. Si no hay pedidos en la base de datos.

### Obtener el detalle de una orden
* GET /order/getOne/:id
* Descripción: Obtiene un pedido específico por su ID.
* Parámetros:
    * id: ID del pedido a buscar.
* Respuesta:
    * Código 200: Éxito. Devuelve el pedido correspondiente al ID proporcionado.
    * Código 404: No encontrado. Si el pedido con el ID dado no existe.

### Creación de una orden
* POST /order/create
* Descripción: Crea un nuevo pedido en la base de datos.
* Parámetros:
    * name: Nombre del pedido.
    * tableNumber: Número de mesa asociado al pedido.
    * products: Lista de productos asociados al pedido.
* Respuesta:
    * Código 201: Creado. Devuelve el pedido recién creado.
    * Código 404: No encontrado. Si alguno de los productos no existe en la base de datos.

Para la creación de la orden, el mecanismo es muy parecido al de los productos con ingredientes. Aquí ya deben haber productos existentes para poder crear una order. 
Esta es quien asocia que productos tiene asociados. De los productos solo se recibe el nombre, luego, en el servicio, se busca en la base de datos los productos que coincidan
con los nombres ingresados, y se agregan a la orden.

### Actualización de datos de una orden
* PUT /order/update/:id
* Descripción: Actualiza un pedido existente en la base de datos.
* Parámetros:
    * id: ID del pedido a actualizar.
    * name: Nuevo nombre del pedido.
    * status: Nuevo estado del pedido.
* Respuesta:
    * Código 200: Éxito. Devuelve el pedido actualizado.
    * Código 404: No encontrado. Si el pedido con el ID dado no existe.

Este es el mismo funcionamiento que productos y ingredientes, en este método solo se busca actualizar los valores propios de la orden, no las asociasiones que tiene.

### Añadir un producto a la orden
* PUT /order/addProduct/:id
* Descripción: Agrega productos a un pedido existente.
* Parámetros:
    * id: ID del pedido al que se agregarán los productos.
    * Cuerpo de la solicitud (JSON) con los nombres de los productos a agregar.
* Respuesta:
    * Código 200: Éxito. Devuelve el pedido actualizado con los nuevos productos agregados.
    * Código 404: No encontrado. Si el pedido con el ID dado no existe.

### Borrar producto de la orden
* PUT /order/deleteProduct/:id
* Descripción: Elimina productos de un pedido existente.
* Parámetros:
    * id: ID del pedido del que se eliminarán los productos.
    * Cuerpo de la solicitud (JSON) con los nombres de los productos a eliminar.
* Respuesta:
    * Código 200: Éxito. Devuelve el pedido actualizado con los productos eliminados.
    * Código 404: No encontrado. Si el pedido con el ID dado no existe.

Como ya se mencionó, se separaron las ediciones de una orden por los atributos propios de la misma, de sus relaciones, para que no se tuviera que validar en una sola función
si era para añadir productos, o editar el nombre de la orden.

### Borrar una orden completa, con sus relaciones incluidas
* DELETE /order/delete/:id
* Descripción: Elimina un pedido existente de la base de datos.
* Parámetros:
    * id: ID del pedido a eliminar.
* Respuesta:
    * Código 200: Éxito. Devuelve un mensaje indicando que el pedido ha sido eliminado correctamente.
    * Código 404: No encontrado. Si el pedido con el ID dado no existe.

## 6. Menús

### Obtener todo el menú (obtener todos los productos que se puedan mostrar)
* GET /menu
* Descripción: Obtiene todos los productos del menú disponibles en la base de datos.
* Parámetros: Ninguno.
* Respuesta:
    * Código 200: Éxito. Devuelve una lista de productos del menú disponibles.
    * Código 404: No encontrado. Si no hay productos del menú en la base de datos.

Para este método es clave mencionar que no todos los productos salen en el menú de la tienda, únicamente se muestran los que están disponibles, estos son los que su cantidad es 
mayor que su cantidad mínima en el stock. Esto para evitar que se tome la orden de más productos de los que se pueden preparar.

### Obtener el detalle de un solo producto
* GET /menu/getOne/:id
* Descripción: Obtiene información detallada de un producto del menú por su ID.
* Parámetros:
    * id: ID del producto del menú a buscar.
* Respuesta:
    * Código 200: Éxito. Devuelve la información detallada del producto del menú correspondiente al ID proporcionado.
    * Código 404: No encontrado. Si el producto del menú con el ID dado no existe.

## 7. Reportes

### Obtener todos los reportes con respecto al abastecimiento
* GET /report/logistic
* Descripción: Genera un informe logístico que muestra los detalles de los abastecimientos dentro de un rango de fechas especificado.
* Parámetros:
    * startDate: Fecha de inicio del rango de fechas para el informe.
    * endDate: Fecha de finalización del rango de fechas para el informe.
    * name: Nombre del informe (opcional).
* Respuesta:
    * Código 200: Éxito. Devuelve un informe detallado de los abastecimientos dentro del rango de fechas especificado.
    * Código 404: No encontrado. Si no hay órdenes de abastecimiento dentro del rango de fechas proporcionado.

### Obtener todos los reportes con respecto a órdenes
* GET /report/orders
* Descripción: Genera un informe de órdenes que muestra los detalles de las órdenes dentro de un rango de fechas especificado.
* Parámetros:
    * startDate: Fecha de inicio del rango de fechas para el informe.
    * endDate: Fecha de finalización del rango de fechas para el informe.
    * name: Nombre del informe (opcional).
* Respuesta:
    * Código 200: Éxito. Devuelve un informe detallado de las órdenes dentro del rango de fechas especificado.
    * Código 404: No encontrado. Si no hay órdenes dentro del rango de fechas proporcionado.

En este caso solo se decidió mostrar el resultado de todas las consultas de ambas partes con sus entidades, luego, se crea un reporte según lo ingresado por el usuario, además
de que filtra por fechas.

# Conclusiones

Se tiene una lógica de restaurante más inventario en el proyecto, donde la persona podrá crear sus productos con todo lo que eso conlleva, tenes más de una *Sede* activa con cada
uno de los componentes de la misma, estando listo para poder ser vendidos a los usuarios. El usuario de manera sencilla puede conocer que Sedes, productos, ingredientes y pedidos 
tiene. Pero además, se le permite manejar su inventario dentro del mismo restaurante. Seguidamente de que podrá enseñarle al usuario el menú disponible, y tener a su disposición un
reporte siempre y cuando sea necesario.