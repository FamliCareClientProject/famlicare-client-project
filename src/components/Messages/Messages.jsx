import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket"


//socket and react 

// import { useState } from "react";


function Messages() {
    const dispatch = useDispatch();
    const history = useHistory();

    //declare states 
    const [message, setMessage] = useState('')
    const [isConnected, setIsConnected] = useState(socket.connected)


    useEffect(() => {
        //connect with the server
        socket.connect(() => {
            console.log('connected!')
        })

        return () => {
            
            socket.off('');
          };
    }, [])

    socket.connect()
    console.log('rendered')

        
        const sendMessage = () => {
            socket.emit('new message', message)
            console.log('new message emitted!')
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
