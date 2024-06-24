import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSocketSetup from "./UseSocketSetup";
import socket from "../../socket";


function Messages() {

    //declare states 
    const [message, setMessage] = useState('')
    //use useSelector to grab the lovedOneId
    const user = useSelector(store => store.user)
    //use the SocketSetup to connect
    useSocketSetup()

    console.log('lovedOneid is:', user.loved_one_id)
    const loved_one_id = user.loved_one_id
    useEffect(() => {
        socket.emit("join_room", loved_one_id);
            console.log('Joined Room Succesfully !')
    }, [])

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
