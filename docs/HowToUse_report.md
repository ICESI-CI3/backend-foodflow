# Guía de uso del proyecto

## Instalaciones de dependencias y levantamiento de docker

* npm install @nestjs/cli

En la raiz del proyecto

* npm install -g yarn

No dejará trabajar con yarn por powershell (ejecutar como administrador)

Get-ExecutionPolicy
Set-ExecutionPolicy RemoteSigned

Seguidamente pulsar la tecla S o Y dependiendo del idioma

* yarn add @nestjs/cli
* yarn add uuid
* yarn add @nestjs/passport
* yarn add @nestjs/jwt
* yarn add bcrypt
* npm install --save @nestjs/typeorm typeorm typeorm-extension
* npm install cross-var
* yarn add @Nestjs/config

Luego se debe levantar el docker.

### Para linux

* sudo chmod -R 777 pgadmin-data/
* sudo chmod -R 777 pgadmin4-data/

### Para windows 

Debes tener el docker desktop instalado en tu equipo.

Luego, para ambos equipos, deben ejecutar en la raíz del proyecto el siguiente comando:

* docker-compose up

Luego deben generar las migraciones para que su base de datos tenga tablas que llenar

* npm run migration:generate --name=nombre_que_deseen

Seguidamente ejecutarlas

* npm run migration:run

Finalmente, llenar los datos de la base de datos, para esto necesitan la extensión *Thunder Client*, o a través de *Postman*, importan el archivo de la carpeta **json_thunderClient**. Y ejecutan el de la carpeta *Seed*

## Orden de ejecución de las entidades

Las entidades están diseñadas para ser creadas en momentos específicos por las relaciones que estas contienes, entonces para que el programa fluya con tranquilidad debe
seguir este orden a la hora de crear entidades:

1. User
2. Location
3. Logistic (con al menos un ingrediente)
4. Product
5. Order
6. Menu
7. Report

Estos son los pasos que se deben seguir para tener una instalación completa del proyecto.