  /* istanbul ignore next */
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express')
const socket = require("socket.io")
const cors = require("cors")
const index = require("./routes/indexRoute")
const errorHandler = require('./middlewares/errorHandler')
const allowConnection = require("./middlewares/allowConnection")

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/", index)

app.use(errorHandler)

/* istanbul ignore next */
if(process.env.NODE_ENV !== 'test') {

  const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })

  //=============== SOCKET IO STUFF ================

  const messageDB = []
  const usersOnline = [];

  const io = socket(server, {
    cors: {
      origin: `http://localhost:3000`
    }
  })

  io.use(allowConnection)

  io.on("connection", socket => {
    console.log(socket.id, socket.username, "connected!")
    
    usersOnline.push({
      userID: socket.id,
      username: socket.username,
    });

    socket.emit("receiveHistory", messageDB)

    socket.on("send-message", ({ message, recipient }) => {

      if(messageDB.length >1500) {
        messageDB.shift()
      }
      messageDB.push(message)

      let foundrecipient = usersOnline.find(user => user.username == recipient)
      if(foundrecipient) socket.to(foundrecipient.userID).emit('received-message', messageDB)
    })

    socket.on("disconnect", () => {
      let deletedIndex = usersOnline.findIndex(user => user.username == socket.username)
      usersOnline.splice(deletedIndex, 1)

      console.log(`USER ${socket.username} DISCONNECTED`)
      console.log("Current User", usersOnline)
    })
  })
}

module.exports = app;