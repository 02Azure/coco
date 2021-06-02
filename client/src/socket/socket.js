import { io } from "socket.io-client";

const URL = "http://52.207.207.52:3000";
const socket = io(URL, { autoConnect: false });

export default socket;
