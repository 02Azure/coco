import React from "react"
import "./lastMessage.css";
import { useHistory } from "react-router-dom"
import socket from "../socket/socket"

export default function LastMessage({ id, username, message, timestamp }) {
  const history = useHistory()

  timestamp = new Date(timestamp)
  timestamp = timestamp.toLocaleTimeString("en-GB").slice(0,5)

  function toUserTargetChat() {
    socket.off("receiveHistory")
    history.push("/chat?recipient=" + id)
  }
  return(
    <div className="history-chat" onClick={ toUserTargetChat }>
      <div className="row">
        <div className="col-md-2">
          <p className="username">{ username }</p>
        </div>
        <div className="col-md-12 text__handle chatbox">
          <span className="text__chat">{ message }</span>
          <span>{ timestamp }</span>
        </div>
      </div>
    </div>
    
  )
}