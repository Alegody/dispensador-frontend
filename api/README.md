# Dispensador API

API simple en Node.js con Express que responde "OK" y se conecta a una base de datos PostgreSQL.

## Variables de entorno
- DATABASE_HOST (default: coordinator)
- DATABASE_PORT (default: 5432)
- DATABASE_USER (default: postgres)
- DATABASE_PASSWORD (default: mysecretpassword)
- DATABASE_NAME (default: mydatabase)

## Uso
- Construir la imagen Docker:
  ```sh
  docker build -t dispensador-api .
  ```
- Ejecutar el contenedor:
  ```sh
  docker run --env DATABASE_HOST=coordinator --env DATABASE_PORT=5432 --env DATABASE_USER=postgres --env DATABASE_PASSWORD=mysecretpassword --env DATABASE_NAME=mydatabase -p 3000:3000 dispensador-api
  ```
- Acceder a `http://localhost:3000/` para ver la respuesta "OK" si la conexión a la base de datos es exitosa.
