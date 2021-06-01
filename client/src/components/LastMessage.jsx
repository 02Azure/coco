import React from "react"
import "./lastMessage.css";
import { useHistory } from "react-router-dom"
import socket from "../socket/socket"

export default function LastMessage({ id, username, image, message, timestamp }) {
  const history = useHistory()

  timestamp = new Date(timestamp)
  let today = new Date()
  
  let date = timestamp.toLocaleDateString("en-GB")
  if(today.toLocaleDateString("en-GB") === date) {
    date = "Today"
  }
  
  let time = timestamp.toLocaleTimeString("en-GB").slice(0,5)

  if(message.length > 53) {
    message = message.slice(0, 52)
    message += " ..."
  }

  function toUserTargetChat() {
    socket.off("receiveHistory")
    history.push("/chat?recipient=" + id)
  }
  return(
    <div className="history-chat" onClick={ toUserTargetChat }>
      <div className="contact-picture">
        <img src={ image } alt={ username + "avatar" } />
      </div>
      <div className="row history-content">
        <div className="col-md-2 header-chatbox">
          <p className="username">{ username }</p>
          <span>{ date }</span>
        </div>
        <div className="col-md-12 chatbox">
          <span className="channel-chat">{ message }</span>
          <span>{ time }</span>
        </div>
      </div>
    </div>
    
  )
}