// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();
// const { Server } = require("socket.io");
// const cors = require("cors")
// const pgAdapter = require("@socket.io/postgres-adapter")
// // const passport = require("passport")
// // const sessionMiddleware = require("../modules/session-middleware")

// //!  CHANGE BOILER PLATE TO REFLECT EXPRESS FRAME WORK NOT HTTP 
// //DEFINE A SEPERATE PORT FOR SOCKET.IO TO BE ON
// const PORT = process.env.PORT || 3000
// const app = express()
// app.use(cors())
// // app.use(sessionMiddleware);

// //declare the server and listen on PORT 
// const server = app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`)
// })

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//     //Seperate domain for the front end server ? 
//   }, 
// });

// // //Share User Context with Socket.io 

// io.engine.use((sessionMiddleware));
// io.engine.use((passport.session()));

// io.on('connection', (socket) => {
//   //server side when a user is connected
//   console.log('connected!')
//   socket.on('new message', (message) => {
//     //! no longer have access to req.user while using socket 
//     //const lovedOneId = socket.request.user.id
    
//     // const userId = socket.request.user.id
//     // console.log('user id is:', userId)
//     const sqlText = `INSERT INTO messages("message_text")
//                         VALUES ($1);`
//     const sqlValues = [message]

//     pool.query(sqlText, sqlValues)
//       .then((result) => {
//         console.log('send successful')})
//   })
//     pool.on('error', (err) => {
//       console.error("Postgres error", err)
//     })
// })


// io.adapter(pgAdapter.createAdapter(pool))

/**
 * GET route template
 */
// router.get('/', (req, res) => {
//   // GET route code here
//   console.log('💬 MESSAGES GET ROUTE IS ONLINE 💬');

//   const sqltext = `SELECT * FROM messages`

//   pool
//     .query(sqltext)
//     .then((dbres) => {
//       console.log(dbres.rows)
//       res.send(dbres.rows)
//     })
//     .catch((err) => {
//       console.log('Error In GET ROUTE', err)
//       res.sendStatus(500)
//     })

// });

// io.on('connection', (socket) => {
//   console.log('a user is connected');
// })





// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   // POST route code here
//   console.log('💬 MESSAGES POST ROUTE IS ONLINE 💬');

//   pool
//     .query()
//     .then(() => {

//     })


// });

//module.exports = router;
