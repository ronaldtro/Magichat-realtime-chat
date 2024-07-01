import {createServer} from "node:http"
import next from 'next'
import {Server} from 'socket.io'
import dotenv from 'dotenv'
dotenv.config()

const dev = process.env.NODE_ENV !== "production" //Verificar entorno de desarrollo - true/false
const hostname = process.env.HOSTNAME
const port = process.env.PORT || 3000

const app = next({dev, hostname, port})
const handler = app.getRequestHandler()

app.prepare().then(() => {

    const httpServer = createServer(handler)
    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log("Usuario conectado")

        socket.on("new message", (message) => {
            console.log(`data websocket: ${message}`)
            io.emit("new message", message)
        })
    })

    httpServer.once("error", (error) => {
        console.error(error)
        process.exit(1)
    }).listen(port, () => {
        console.log(`Servidor esta activo en http://${hostname}:${port}`)
    })
    
})

