import './chat.css'
import React, { useState, useEffect, useRef } from "react"
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findOneUser } from "../store/action"
import socket from "../socket/socket"
import MessageBalloon from "../components/MessageBalloon"
import LastMessage from "../components/LastMessage"

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

  const messagesEndRef = useRef(null)
  useEffect(() => {
    //jika route sekarang ada query recipient dan telah berhasil di get
    if(recipient.username) {

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
      socket.auth = { username: loggedUser.username }
      socket.connect()

      socket.on("receiveHistory", data => {
        if(data.length) {
          let uniqueUser = [] 
          let userContacts = []
  
          //filter pesan yang hanya melibatkan user ini
          data = data.filter(message => {
            return ((message.from.username == loggedUser.username) || (message.recipient.username == loggedUser.username))
          })
  
          //mempermudah mengambil pesan terakhir
          data.reverse()
          console.log(data)
  
          //buat array contact dari pesan terakhir dari/ke user yang unik pada loggedUser ini
          data.forEach(message => {
            if(message.from.username !== loggedUser.username) {
              if(uniqueUser.indexOf(message.from.username) < 0) {
                uniqueUser.push(message.from.username)
                userContacts.push({ 
                  id: message.from.id, 
                  username: message.from.username, 
                  image: message.from.image,
                  message: message.message, 
                  timestamp: message.timestamp 
                })
              }
            }
            else {
              if(uniqueUser.indexOf(message.recipient.username) < 0) {
                uniqueUser.push(message.recipient.username)
                userContacts.push({ 
                  id: message.recipient.id, 
                  username: message.recipient.username,
                  image: message.recipient.image, 
                  message: message.message, 
                  timestamp: message.timestamp 
                })
              }
            }
          })
          setContacts(userContacts)
        }
      })  

      socket.on("received-message", data => {
        data = data.filter(message => {
          return ((message.from == loggedUser.username) || (message.recipient == loggedUser.username))
        })
        setMessages(data)
      })
    }
    
  },[recipient, contacts])

  useEffect(() => {
    if(+recipientId) {
      dispatch(findOneUser(recipientId))
    }

  },[recipientId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  function goHome(){
    // console.log(data);
    // console.log(user);
  }

  function goProfile(){
      history.push('/profile')
  }

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
        <h2 className="chat-title">Chat - { recipient.username }</h2>
        <div className="main__chat">
          <div className="box__chat">
            { messages.length ? messageBalloons : "" }
            <div ref={ messagesEndRef } />
            <div className="text__input">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                  <Form.Control type="text" placeholder="type a message" className="input__message" value={message} onChange={ e => setMessage(e.target.value) } />
                  <button onClick={ sendMessage }>Send</button>

                </Form.Group>
              </Form>
            </div>
          </div>
        </div>

      </div> :
        <>
          <h2 className="chat-title">Chat</h2>
          <div className="last-message-container">
            { lastMessages }
          </div>
        </>

    }
    </section>
  )
}