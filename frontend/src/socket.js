import { io } from "socket.io-client";

const socket = io("http://localhost:5001"); // Change if deploying remotely

export default socket;
