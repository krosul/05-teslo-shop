# Next.js Teslo shop app

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d,significa _detached_

MongoDb url Local:
´´´
mongodb://localhost:27017/teslo-db
´´´

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

##Llenar la base de datos con informacion de pruebas

llamar a:

```
http://localhost:3000/api/seed
```
