const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const path = require("path");
const pgAdapter = require("@socket.io/postgres-adapter");
const pool = require("./modules/pool");
// Middleware Includes
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");
// Route Includes
const userRouter = require("./routes/user.router");
const careTeamRouter = require("./routes/careTeam.router");
const careVaultRouter = require("./routes/careVault.router");
const lovedOneRouter = require("./routes/lovedOne.router");
const messagesRouter = require("./routes/messages.router");
// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));
// Passport Session Configuration
app.use(sessionMiddleware);
// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api/user", userRouter);
app.use("/api/care-team", careTeamRouter);
app.use("/api/care-vault", careVaultRouter);
app.use("/api/loved-one", lovedOneRouter);
app.use("/api/messages", messagesRouter);
app.use("/fonts", express.static(path.join(__dirname, "../../public/fonts")));
// Add CORS middleware
const cors = require("cors");
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN_HOST, // specify the allowed origin
//     credentials: true,
//   })
// );

//console.log(process.env.CORS_ORIGIN_HOST)
// Socket.IO setup
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN_HOST,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
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
//postgres adapter to use pool with socket.io
io.adapter(pgAdapter.createAdapter(pool));
// Socket.IO connection/event listeners
io.on("connection", (socket) => {
  //server side when a user is connected
  console.log("connected! User data is:", socket.request.user);
  // console.log(socket.request)
  // Joins the User into a room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User${socket.id} Joined Room: ${room}`);
  });



  // Socket event listener for receiving a new message
  socket.on("new message", (message) => {
    console.log("new message received!");
    const newMessage = message.message_text
    const userId = socket.request.user.id;
    const lovedOneId = socket.request.user.loved_one_id;
    const sqlText = `WITH new_message AS (
                      INSERT INTO messages ("loved_one_id", "user_id", "message_text")
                      VALUES ($1, $2, $3)
                      RETURNING *
                    )
                    SELECT nm.*, u.username, u.first_name, u.last_name
                    FROM new_message nm
                    INNER JOIN "user" u ON nm.user_id = u.id;
                      `;
    const sqlValues = [lovedOneId, userId, newMessage];
    pool
      .query(sqlText, sqlValues)
      .then((result) => {
        console.log("send successful");
        console.log(result.rows[0])
        socket.broadcast.to(lovedOneId).emit("message recieved", result.rows[0]);
      })
      .catch((error) => {
        console.error("Error inserting message:", error);
      });
  });


  socket.on("fetch messages", (room) => {
    const sqlText = `SELECT
                      "user".id AS "user_id",
                      "user".username,
                      "user".first_name,
                      "user".last_name,
                      "user".loved_one_id,
                      messages.message_text,
                      messages.msg_sent_timestamp
                    FROM "user"
                    JOIN "messages"
                    ON messages.user_id = "user".id
                   WHERE "user".loved_one_id = $1;`;
    const sqlValues = [room];
    pool
      .query(sqlText, sqlValues)
      .then((result) => {
        const messages = result.rows;
        socket.emit("Have messages", messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  });
});
// Listen Server & Port
httpServer.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
