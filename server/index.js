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

let players=[]

const rooms={}

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
app.get('/test', (req, res) => {
  res.send({res:"hii"});
});
app.get('/getAllPlayers', (req, res) => {
  res.json({players});
});

io.on('connection', (socket) => {
    console.log("A user has connected")
    socket.on("joinServer",(data,cb)=>{
      console.log({newplayerdata:data})
      const isUsernameExists=players.find(player=>player.name===data.name)
      if(isUsernameExists){
        socket.emit("usernameNotUnique")
      }else{
        players.push({...data,id:socket.id})
        console.log(players)
        socket.broadcast.emit('updatePlayerList',players)
        cb(true)
      }
    })

    socket.on('disconnect',()=>{
        console.log("user has disconnected");
        const disconnectedPlayer = players.find(player => player.id === socket.id);
        if (disconnectedPlayer) {
          players = players.filter(player => player.id !== socket.id);
          socket.broadcast.emit('playerLeft', disconnectedPlayer);
      }
    })

    socket.on('createGame', (callback) => {
      const roomUniqueId = makeid(6);
      rooms[roomUniqueId] = {};
      socket.join(roomUniqueId);
      socket.emit("newGame", {roomUniqueId: roomUniqueId});
      callback(`creating new game...in room ${roomUniqueId}`)
  });

  socket.on('askToPlay',(data,cb)=>{
    cb(true)
  })

  socket.on('getAllPlayers',(cb)=>{
    cb(players)
  })



  });

server.listen(3000, () => {
  console.log('server running...');
});