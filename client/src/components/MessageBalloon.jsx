import React from "react"

export default function MessageBalloon({ username, message }) {
  return(
    <div className="box__sent">
      <div className="row">
        <div className="col-md-2">
          <p>{ username }</p>
        </div>
        <div className="col-md-10 text__handle">
          <p className="text__chat">{ message }</p>
        </div>
      </div>
    </div>
    
  )
}