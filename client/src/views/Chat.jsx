import './chat.css'
import React, { useState, useEffect, useRef } from "react"
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findOneUser, setOneUser } from "../store/action"
import socket from "../socket/socket"
import MessageBalloon from "../components/MessageBalloon"
import LastMessage from "../components/LastMessage"
import createLastChatHistory from "../helpers/createLastChatHistory"

export default function ChatPage(){
  const history = useHistory()
  const dispatch = useDispatch()

  const loggedUser = JSON.parse(localStorage.getItem('userLog'))

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let recipientId = params.get('recipient')

  const recipient = useSelector(state => state.oneUser)

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [contacts, setContacts] = useState([])
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    //jika route sekarang ada query recipient dan telah berhasil di get
    if(recipient.username && recipientId) {
      socket.disconnect()
      socket.auth = { username: loggedUser.username }
      socket.connect()
    
      socket.on("receiveHistory", data => {
        if(data.length) {
          data = data.filter(message => {
            //filter hanya pesan antara kedua user
            return ((message.from.username == loggedUser.username) && (message.recipient.username == recipient.username)) || ((message.from.username == recipient.username) && (message.recipient.username == loggedUser.username))
          })
        }

        setMessages(data)
      })
  
      socket.on("received-message", data => {
        data = data.filter(message => {
          //filter hanya pesan antara kedua user
          return ((message.from.username == loggedUser.username) && (message.recipient.username == recipient.username)) || ((message.from.username == recipient.username) && (message.recipient.username == loggedUser.username))
        })
        setMessages(data)
      })

    } else if(!recipientId) { //jika route sekarang hanya /chat
      socket.disconnect()
      socket.auth = { username: loggedUser.username }
      socket.connect()

      socket.on("receiveHistory", data => {
        if(data.length) {
          setContacts(createLastChatHistory(data, loggedUser.username))
          setIsLoading(false)
        }
      })  

      socket.on("received-message", data => {
        console.log("terima!!")
        if(data.length) {
          setContacts([])
          setContacts(createLastChatHistory(data, loggedUser.username))
          setIsLoading(false)
        }
      })
    }
    
  },[recipient])

  useEffect(() => {
    if(+recipientId) {
      dispatch(findOneUser(recipientId))
    }

  },[recipientId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  function sendMessage(e) {
    e.preventDefault()

    let newMessage = {
      from: {
        id: loggedUser.id,
        username: loggedUser.username,
        image: loggedUser.image
      },
      recipient: {
        id: recipient.id,
        username: recipient.username,
        image: recipient.userImage
      },
      message,
      timestamp: new Date()
    }

    socket.emit("send-message", { message: newMessage, recipient: recipient.username })

    setMessages(previousMessages => previousMessages.concat(newMessage))
    setMessage("")
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }

  let messageBalloons
  
  messageBalloons = messages.map((chat, index) => {
    return(
      <MessageBalloon
        key = { index }
        message = { chat?.message } 
        username = { chat?.from.username }
        timestamp = { chat?.timestamp }
      />
    )
  })

  let lastMessages = []

  if(!recipientId) {
    lastMessages = contacts.map((lastmessage, index) => {
      return(
        <LastMessage
          key = { index }
          { ...lastmessage }
        />
      )
    })
  }

  return(
    <section className="chat">
      { recipientId ?
      
      <div className="row">
        <div className="chat-room-header">
          <div 
            className = "recipient" 
            onClick = { () => { history.push(`/profile/${recipient.id}`)} }
            title = { `Go to ${recipient.username} Profile` }
          >
            <div className="header-picture">
              <img 
              alt = { recipient.username + "_avatar" } 
              src = { !imageError ? recipient.userImage : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png" }
              onError = { () => { 
                if(!imageError) {
                  setImageError(true) 
                } 
              } }
            />
            </div>
            <h2 className="chat-title">{ recipient.username }</h2>
          </div>
          <span 
            className="return-link" 
            onClick={ () => { 
              socket.off("receiveHistory")
              socket.off("receivedMessage")
              socket.disconnect()
              setIsLoading(true)
              setContacts([])
              history.push("/chat") 
              dispatch(setOneUser({}))
            }}
          >Return to Chat
        </span>
        </div>

        <div className="main__chat">
          <div className="box__chat">
            <div className="messageBalloons-container">
              { messages.length ? messageBalloons : "" }
              <div ref={ messagesEndRef } />
            </div>
            <div className="text__input">
              <Form className="input-message-container">
                <input rows="1" placeholder="type a message" className="input__message" value={message} onChange={ e => setMessage(e.target.value) } />
                <button className="btn btn-primary send-button" onClick={ sendMessage }><i className ="fas fa-paper-plane"/></button>
              </Form>
            </div>
          </div>
        </div>

      </div> :
        <>
          <h2 className="chat-title">Chat</h2>
          { !isLoading ? contacts.length ? 
            <div className="last-message-container">
              { lastMessages }
            </div> :

            <div className="empty-message-container">
               <h2 className="empty-title">Nothing to show here...</h2>
              <p className="empty-desc">Start one by clicking Chat in other user's profile!</p>
            </div> :
            <h2 className="loading-text">Loading...</h2>
          }
        </>
    }
    </section>
  )
}