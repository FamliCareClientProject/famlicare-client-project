import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';
const socket = new io(URL, {
    autoConnect:false,
    withCredentials:true});

export default socket