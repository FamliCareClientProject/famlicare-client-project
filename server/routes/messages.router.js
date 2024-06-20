const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { Server } = require("socket.io");
const cors = require("cors")

//!  CHANGE BOILER PLATE TO REFLECT EXPRESS FRAME WORK NOT HTTP 
//DEFINE A SEPERATE PORT FOR SOCKET.IO TO BE ON
const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
    //Seperate domain for the front end server ? 
  },
});

io.on('connection', (socket) => {
  //server side when a user is connected
  console.log(socket.id)
})



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

module.exports = router;
