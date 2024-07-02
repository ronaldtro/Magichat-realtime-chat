'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function Home() {

  const [isActiveChat, setIsActiveChat] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [user, setUser] = useState("")
  // const [isConnected, setIsConnected] = useState(false)
  // const [transport, setTransport] = useState("N/A")

  useEffect(() => {

    getUser()
    getMessages()

    if (socket.connected) {
      connected()
    }

    function connected() {
      console.log("Conectado a web socket")
      // setIsConnected(true)
      // setTransport(socket.io.engine.transport.name)
      // socket.io.engine.on("upgrade", (transport) => {
      //   setTransport(transport.name)
      // })
    }

    function onConnect() {
      console.log("Conectar")
    }

    socket.on("new message", (msgs) => {
      setMessages(msgs)
    })

    function onDisconnect() {
      console.log("Desconectar")
    }

    socket.on("connect", onConnect)

    socket.on("disconnect", onDisconnect)

    return () => { // Funcion de limpieza de eventos al desmontar componente
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [])

  function getUser(){
    const getUser = localStorage.getItem("user")
    if (getUser) {
      setUser(getUser)
    } else {
      const username = "visitor" + parseInt((Math.random() * 100).toString())
      setUser(username)
      localStorage.setItem("user", username)
      console.log(username)
    }
  }

  async function getMessages(){
    const resp = await fetch("/api/messages", {
      method: "GET",
      headers: {"Content-type": "application-json"}
    })
    const respObj = await resp.json()
    setMessages(respObj.data)
  }

  const activateChat = () => {
    setIsActiveChat(!isActiveChat)
  }

  const sendMessage = async (e: any) => {

    e.preventDefault()
    if (message === "") return

    const date = new Date()
    const parsedDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()+"-"+date.getHours()+":"+(date.getMinutes() < 10 ? "0"+date.getMinutes().toString() : date.getMinutes())

    const msg = { user: user, date: parsedDate, message: message }
    const msgs = [...messages, msg]

    const resp = await fetch("/api/messages", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(msg)
    })
    
    const objResp = await resp.json()
    console.log(objResp)

    socket.emit("new message", msgs)
    setMessage("")
  }

  return (
    <main>
      <button id={isActiveChat ? 'chatButtonOn' : 'chatButtonOff'} onClick={activateChat}>
        <span id="messagesCounter">{messages.length}</span> 🌀 Chat
      </button>
      {isActiveChat ? (
        <section id="chat">
          <div id="navbar">
            <h3>🧙‍♂️ Magichat</h3>
          </div>
          <div id="container">
            <ul id="messages">
              {
                messages.map((m: any, index: number) => {
                  return (
                    <li key={index}>
                      <div><span id="username">{m.user}</span> <span id="date">{m.date}</span></div>{m.message}
                    </li>
                  )
                })
              }
            </ul>
            <form id="footer" onSubmit={sendMessage}>
              <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} name="message" id="message" placeholder="Escribe tu mensaje.." autoComplete="off" />
              <button>
                Enviar
              </button>
            </form>
          </div>
        </section>
      ) : ''}

    </main>
  );
}
