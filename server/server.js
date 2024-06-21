const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const path = require('path');

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const careTeamRouter = require('./routes/careTeam.router');
const careVaultRouter = require('./routes/careVault.router');
const lovedOneRouter =require('./routes/lovedOne.router');
const messagesRouter = require('./routes/messages.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/care-team', careTeamRouter);
app.use('/api/care-vault', careVaultRouter);
app.use('/api/loved-one', lovedOneRouter);
//app.use('/api/messages', messagesRouter);
app.use('/fonts', express.static(path.join(__dirname, '../../public/fonts')));










//! stuff 

const pool = require('./modules/pool');
const { Server } = require("socket.io");
const cors = require("cors")
const pgAdapter = require("@socket.io/postgres-adapter")
const { createServer } = require("node:http")
app.use(cors())

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials:true
  }, 
});

// //Share User Context with Socket.io 

function onlyForHandshake(middleware) {
  return (req, res, next) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
      middleware(req, res, next);
    } else {
      next();
    }
  };
}


io.engine.use(onlyForHandshake(sessionMiddleware));
io.engine.use(onlyForHandshake(passport.session()));







io.on('connection', (socket) => {
  //server side when a user is connected
  console.log('connected!', socket.request.user)
 
  // const userId = socket.request.user.firstName
  // console.log(userId)
  // console.log('user id is:', userId)
})

  io.on('new message', (message) => {
    //! no longer have access to req.user while using socket 
    console.log('new message recieved!')
    
    
    //const lovedOneId = socket.request.user.id 
    const sqlText = `INSERT INTO messages("message_text")
                        VALUES ($1);`
    const sqlValues = [message]

    pool.query(sqlText, sqlValues)
      .then((result) => {
        console.log('send successful')})
  })
    pool.on('error', (err) => {
      console.error("Postgres error", err)
    })

io.adapter(pgAdapter.createAdapter(pool))







// Listen Server & Port
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
