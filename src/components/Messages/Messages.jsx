import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'



function Messages() {
    const dispatch = useDispatch();
    const history = useHistory();

    //declare states 
    const [message, setMessage] = useState('')
    const socket = io("ws://localhost:3000")

    useEffect(() => {
        //connect with the server
        socket.on('connect', () => {
            console.log('Connected!')  
        })

    }, [])
    
    
        
        const sendMessage = () => {
            socket.emit('new message', message)
            setMessage('')
        }



    return (
        <div>
            <h1>Messages</h1>
            <input
            placeholder="message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}/>
            <button onClick={(sendMessage)}>send</button>
        </div>
    )
}

export default Messages;
