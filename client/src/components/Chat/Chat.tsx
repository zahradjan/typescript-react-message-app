import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { io, Socket } from 'socket.io-client'
import InfoBar from './../InfoBar/InfoBar'
import Input from './../Input/Input'
import Messages from './../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

import './Chat.css'
let socket: Socket

const Chat = ({ location }) => {
    const [name, setName] = useState<any | null>('')
    const [room, setRoom] = useState<any | null>('')
    const [users, setUsers] = useState('')
    const [messages, setMessages] = useState<any | null>([])
    const [message, setMessage] = useState('')
    const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        })
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat
