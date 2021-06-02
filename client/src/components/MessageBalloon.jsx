import React from "react"
import "./messageBalloon.css"

export default function MessageBalloon({ username, message }) {
  const loggedUser = JSON.parse(localStorage.getItem('userLog'))
  let messageStyle = "recipient-message"
  let balloonPosition = ""

  if(loggedUser.username === username) {
    balloonPosition = " sender-position"
    messageStyle = "your-message"
    username = "You"
  }
  return(
    <div className="box__sent">
      <div className={"row box-content" + balloonPosition}>
        <span className="chat-handler-username">{ username }</span>
        <div className={"text__handle " + messageStyle }>
          <p className="text__chat">{ message }</p>
        </div>
      </div>
    </div>
    
  )
}