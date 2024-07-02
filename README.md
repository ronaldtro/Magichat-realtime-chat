# Magichat - realtime chat 
Magichat - realtime chat es una aplicacion web que permite incorporar un web chat a tu pagina o aplicativo web.

## Tabla de contenido
- [Introduccion](#introduccion)
- [Como empezar](#como-empezar)
    - [Configuracion rapida](#configuracion-rapida)
- [Preview](#preview)
- [Licencia](#licencia)
- [Referencias](#referencias)

## Introduccion
La webApp fue realizada con: 
Next.js, Express, Socket.io y MongoDb.

La webApp permite realizar comunicaciones en tiempo real entre distintos usuarios. Cuenta con persistencia de datos y 
asignacion de nombres aleatorios.

## Como empezar
## Configuracion rapida
Prerequisitos:
1. Node.js

.env
```bash
PORT = 4000
HOSTNAME = localhost
CONNECTION_STRING = mongoDb cluster
```
localStorage
```bash
user: random
```

dependencies install
```bash
npm install 
```
run development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## 🛜 Live on
🆗 https://magichat-qrh5.onrender.com/

## Preview
![PNG](https://raw.githubusercontent.com/ronaldtro/public-assets/main/magichat.PNG)

## Licencia
Este proyecto es de codigo abierto y esta licenciado bajo [MIT](/LICENSE).

## Referencias
https://socket.io/how-to/use-with-nextjs