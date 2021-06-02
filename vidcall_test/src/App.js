import logo from "./logo.svg";
import "./App.css";

import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000",{
  extraHeaders:{
    "id":"1"
  }
});
function App() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted,setCallAccepted] = useState(false)

  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name,setName] = useState("")

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
      setStream(stream)
      myVideo.current.srcObject = stream
    })
    socket.on("me",(id)=>{
      console.log('masuk')
      setMe(id)
    })
    socket.on("callUser",(data)=>{
      setReceivingCall(true)
      setCaller(data.from)
      setName(data.name)
      setCallerSignal(data.signal)
    })
  },[])


  const callUser = (id) => {
    const peer = new Peer({
      initiator:true,
      trickle:false,
      stream: stream
    })
    peer.on("signal", (data)=>{
      socket.emit("callUser",{
        userToCall:id,
        signalData:data,
        from:me,
        name:name
      })
    })

    peer.on("stream", (stream)=>{
      userVideo.current.srcObject = stream
    })

    socket.on("callAccepted",(signal) =>{
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const answerCall = () =>{
    setCallAccepted(true)
    const peer = new Peer({
      initiator:false,
      trickle:false,
      stream:stream
    })

    peer.on("signal", (data)=>{
      socket.emit("answerCall",{signal:data,to:caller})

    })

    peer.on("stream",(stream) =>{
      userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const leaveCall = () =>{

    setCallEnded(true)
    connectionRef.current.destroy()
  }
  return (
    <div className="container">
      <h1>my Id:{me}</h1>
      <h1>{idToCall}</h1>
      <div className="video_container">
      <div className="video">
        {callAccepted && !callEnded && <video playsInline  ref={userVideo} autoPlay style={{width:"300px"}}/>}
      </div>
      <div className="video">
        {stream && <video playsInline muted ref={myVideo} autoPlay style={{width:"300px"}}/>}
      </div>
      <input type="text" className="form-control py-1 px-2" name="email" value={idToCall} onChange={(e)=> setIdToCall(e.target.value)} placeholder="your-email@gmail.com" id="username" />
      {callAccepted && !callEnded ? (
        <button onClick={leaveCall}>end Call</button>
      ) : (
        <button
        onClick={() => callUser(idToCall)}>call</button>
        
      )}
    </div>
    <div>
      {receivingCall && !callAccepted ? (
        <button onClick={answerCall}>{name} is calling answer</button>
        
      ) : null}
    </div>
  
      
    </div>
  );
}

export default App;
