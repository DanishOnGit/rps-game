import express from 'express';
import { createServer } from 'node:http';
import cors from "cors";
import { Server } from 'socket.io';
import { makeid } from './utils.js';

const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://127.0.0.1:5173","https://rps-game-liart-eight.vercel.app/"]
    }
})

const rooms={}

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
app.get('/test', (req, res) => {
  res.send({res:"hii"});
});

io.on('connection', (socket) => {
    console.log("A user has connected saaar")
    socket.on('disconnect',()=>{
        console.log("user has disconnected saar")
    })

    socket.on('createGame', (callback) => {
      const roomUniqueId = makeid(6);
      rooms[roomUniqueId] = {};
      socket.join(roomUniqueId);
      socket.emit("newGame", {roomUniqueId: roomUniqueId})
      callback(`creating new game...in room ${roomUniqueId}`)
  });

  });

server.listen(3000, () => {
  console.log('server running...');
});