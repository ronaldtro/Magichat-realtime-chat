import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import express from "express";
import {createServer} from 'node:http';
import {Server} from 'socket.io';

const inter = Inter({ subsets: ["latin"] });

// const port = process.env.PORT
// const app = express()
// const server = createServer(app)
// const io = new Server(server)

// io.on("connection", (socket) => {
//   console.log("Usuario conectado")
//   socket.on("disconnect", () => console.log("Usuario desconectado"))
// })

// app.get("/", (req,res) => {
//   res.send("<h1>Test</h1>")
// })
// server.listen(port, () => {
//   console.log("El servidor esta corriendo! :p, PORT:"+port)
// })

export const metadata: Metadata = {
  title: "Realtime - chat",
  description: "Realtime - chat by Ronald C.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
