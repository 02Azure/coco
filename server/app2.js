/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const index = require("./routes/indexRoute");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const http = require("http");
const server = http.createServer(app);
const socket = require('socket.io')
// const io = socket(server)
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.emit("me", socket.id);


  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  }
  )
});


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/videocall",videoCall)

app.use("/", index);

app.use(errorHandler);

/* istanbul ignore next */
if (process.env.NODE_ENV == "production") {
  server.listen(port, () => console.log("http server"));
  // app.listen(port, () => {
  //   console.log(`App listening at http://localhost:${port}`);
  // });
}

function videoCall(req, res, next) {
  console.log('function')
  
}
module.exports = app;
