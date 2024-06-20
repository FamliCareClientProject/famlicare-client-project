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
    const [activeUsers, setActiveUsers] = useState(0)
    const [socketid, setSocketId] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        const socket = io("ws://localhost:3000")
            socket.on('connect', () => {
                console.log('socket.id is:', socket.id)
    })

   
    }, [])

    //    //get socket id of a socket or a user
    //    socket.on('getId', (idOfSocket) => {
    //     setId(idOfSocket)
    //     console.log('the id of the user is:', idOfSocket)
    //    })



   
   
  

    //     //get all users 

    // const messages = useSelector((store) => store.messages)
    // console.log('Message Data is:', messages)

    return (
        <div>
            <h1>Messages</h1>
        </div>
    )
}

export default Messages;
