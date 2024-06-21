import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'

import { useState } from "react";
import { io } from 'socket.io-client';

// const socket = io('http://localhost:3000');

function Messages() {
    const dispatch = useDispatch();
    const history = useHistory();

    //declare states 
    const [message, setMessage] = useState('')
    const socket = io("ws://localhost:3000")

    // const [message, setMessage] = useState([]);
    // const [newMessage, setNewMessage] = useState('');


    useEffect(() => {
        //connect with the server
        socket.on('connect', () => {
            console.log('Connected!')  
        })

    }, [])
    // useEffect(() => {
    //     socket.on('newMessage', (message) => {
    //         dispatch({
    //             type: 'SET_MESSAGES',
    //             payload: message
    //         });
    //     });
    // }, [socket, dispatch]);

    // const handleSubmit = (event) => {
    //     console.log('Handle submit is working')
    //     event.preventDefault();
    //     socket.emit('chat message', newMessage); // use socket.emit to send data 
    //     console.log('New Message is', newMessage)
    //     dispatch({
    //         type: 'SEND_MESSAGE',
    //         payload: newMessage,
    //     });
    //     setNewMessage('');
    // };

    
    
        
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
             {/* <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form> */}
        </div>
    )
}

export default Messages;
