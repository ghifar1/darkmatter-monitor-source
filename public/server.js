const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = 3010;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const wsId = [];

app.use(cors());
app.options("*", cors());

io.on("connection", (socket) => {
  console.log(socket.id);
});

console.log(`Server listen to port ${port}`);
httpServer.listen(port);

app.get("/", (req, res) => {
  return res.json("hello");
});
