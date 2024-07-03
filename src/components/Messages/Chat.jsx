import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSocketSetup from "./UseSocketSetup";
import socket from "../../socket";
import { Box, Typography, TextField, Button, Grid, useTheme } from "@mui/material";

function Chat() {
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const lovedOneID = user.loved_one_id;
  const [room, setRoom] = useState(lovedOneID); // Room ID is based on the loved one's ID
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null); // Reference to the messages container for auto-scrolling

  useSocketSetup(); // Custom hook for setting up socket listeners

  // Join room and fetch messages on component mount
  useEffect(() => {
    socket.emit("join_room", room); // Join the chat room
    socket.emit("fetch messages", room); // Request existing messages for the room

    // Listener for receiving a new message
    socket.on("message recieved", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      // Troubleshooting: Ensure that the message format received matches the expected format
    });

    // Cleanup function to remove socket listeners on component unmount
    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("messages");
      socket.off("message recieved");
    };
  }, [room, setMessages]);

  // Listener for receiving a batch of messages
  useEffect(() => {
    socket.on("Have messages", (messages) => {
      setMessages(messages);
      // Troubleshooting: Check if messages are not being displayed, ensure this event is emitted by the server
    });

    return () => socket.off("Have messages");
  }, [setMessages]);

  // Function to send a new message
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        message_text: currentMessage,
        user_id: user.id,
        loved_one_id: lovedOneID,
        timestamp: Date.now(),
      };
      await socket.emit("new message", message); // Emit the new message to the server
      setMessages((prevMsgs) => [...prevMsgs, message]); // Optimistically update the UI
      setCurrentMessage(""); // Clear the input field after sending
      // Maintenance: Consider implementing feedback for message send failure
    }
  };

  // Auto-scroll to the last message
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      // Troubleshooting: If auto-scrolling is not working, check if this ref is correctly attached to the container
    }
  }, [messages]);

  return (
    <Box sx={{ padding: 2, height: "100vh", overflowY: "auto" }} ref={messagesContainerRef}>
      <Typography variant="h5" gutterBottom>
        CareTeam Chat
      </Typography>
      <Grid container spacing={2}>
        {messages.map((message, index) => (
          <Grid item key={index} xs={12}>
            <Box
              sx={{
                padding: 1,
                borderRadius: 1,
                backgroundColor: message.user_id === user.id ? theme.palette.primary.main : theme.palette.tertiary.light,
                maxWidth: "80%",
                marginLeft: message.user_id === user.id ? "auto" : 0,
                marginRight: message.user_id === user.id ? 0 : "auto",
              }}
            >
              <Typography variant="body1">
                {user.id && (
                  <strong>
                    {message.user_id === user.id ? "You" : `${message.first_name} ${message.last_name}`}
                  </strong>
                )}
                : {message.message_text}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {message.msg_sent_timestamp ? message.msg_sent_timestamp : new Date(message.timestamp).toLocaleTimeString()}
                {/* Maintenance: Ensure timestamp conversion is consistent with server and client time zones */}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ padding: 2, display: "flex", justifyContent: "space-between" }}>
        <TextField
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;