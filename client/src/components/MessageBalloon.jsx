import React from "react"
import "./messageBalloon.css"

export default function MessageBalloon({ username, message, timestamp }) {
  const loggedUser = JSON.parse(localStorage.getItem('userLog'))
  let messageStyle = "recipient-message"
  let balloonPosition = ""
  let timestampPosition = ""

  let today = new Date()
  timestamp = new Date(timestamp)

  if(today.toLocaleDateString("en-GB") === timestamp.toLocaleDateString("en-GB")) {
    timestamp = "Today, " + timestamp.toLocaleTimeString("en-GB").slice(0,5)
  } else {
    timestamp = timestamp.toLocaleString("en-GB")
    timestamp = timestamp.slice(0, timestamp.length-3)
  }

  if(loggedUser.username === username) {
    balloonPosition = " sender-position"
    messageStyle = "your-message"
    username = "You"
    timestampPosition = " right-timestamp"
  }
  return(
    <div className="box__sent">
      <div className="chat-content">
        <div className={"row box-content" + balloonPosition}>
          <span className="chat-handler-username">{ username }</span>
          <div className={"text__handle " + messageStyle }>
            <p className="text__chat">{ message }</p>
          </div>
        </div>
      </div>
      <p className={"chat-timestamp" + timestampPosition}>{ timestamp }</p>

    </div>
    
  )
}