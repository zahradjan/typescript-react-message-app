import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from './../InfoBar/InfoBar'
import Input from './../Input/Input'
import Messages from './../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

import './Chat.css'
let socket: SocketIOClient.Socket
const ENDPOINT = 'http://localhost:5000'

const Chat = ({ location }) => {
    const [name, setName] = useState<any | null>('')
    const [room, setRoom] = useState<any | null>('')
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<any | null>([])

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setRoom(room)
        setName(name)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        })
    }, [location.search])

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
