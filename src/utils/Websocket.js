import { io } from "socket.io-client";
const ws = io("http://localhost:3010");
ws.on("connect", () => {
  console.log(ws.id);
});



export default ws;
