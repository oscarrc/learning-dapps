# Imagen base
FROM node:16.13.2

# Directario de trabajo
WORKDIR /usr/src/app

# Copia de código a la imagen
COPY . .

# Instalación de dependencias
RUN npm install

# Exponemos el puerto del servidor al contenedor
EXPOSE 3000

# Punto de entrada para la ejecución de la dApp, en este caso la shell Sh
ENTRYPOINT ["sh"]

# Comando a ejecutar
CMD ["entrypoint.sh"]