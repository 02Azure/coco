import React, { useState } from "react"
import "./lastMessage.css";
import { useHistory } from "react-router-dom"
import socket from "../socket/socket"

export default function LastMessage({ id, username, image, message, timestamp }) {
  const history = useHistory()

  const [imageError, setImageError] = useState(false)

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
        <img 
          alt = { username + "_avatar" } 
          src = { !imageError ? image : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png" }
          onError = { () => { 
            if(!imageError) {
              setImageError(true) 
            } 
          } }

        />
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