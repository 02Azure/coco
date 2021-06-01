import './chat.css'
import pp from '../images/002.png'
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
  
          //buat array contact dari pesan terakhir dari/ke user yang unik pada loggedUser ini
          data.forEach(message => {
            if(message.from.username !== loggedUser.username) {
              if(uniqueUser.indexOf(message.from.username) < 0) {
                uniqueUser.push(message.from.username)
                userContacts.push({ id: message.from.id, username: message.from.username, message: message.message, timestamp: message.timestamp })
              }
            }
            else {
              if(uniqueUser.indexOf(message.recipient.username) < 0) {
                uniqueUser.push(message.recipient.username)
                userContacts.push({ id: message.recipient.id, username: message.recipient.username, message: message.message, timestamp: message.timestamp })
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
      },
      recipient: {
        id: recipient.id,
        username: recipient.username,
      },
      message,
      timestamp: new Date()
    }

    socket.emit("send-message", { message: newMessage, recipient: recipient.username })

    setMessages(previousMessages => previousMessages.concat(newMessage))
  }

  function scrollToBottom() {
    console.log("trigger kebawah!")
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

        <div className="col-md-4 list__chat">
          <div className="people__content">
            <div className="another__people">
              <div className="row">
                <div className="col-md-3">
                    <img src={pp} className="people__photo"></img>
                </div>
                <div className="col-md-9  people__name">
                    <p className="people__chat">John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8 main__chat">

          <div>
            <a onClick={goHome} className="nav">Home</a>
            <a onClick={goProfile} className="nav">Profile</a>
          </div>


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
        <h2>Chat</h2>
        <div className="last-message-container">
          { lastMessages }
        </div>
        </>

    }
    </section>
  )
}