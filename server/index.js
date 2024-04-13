import express from 'express';
import { createServer } from 'node:http';
import cors from "cors";
import { Server } from 'socket.io';

const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://127.0.0.1:5173","https://rps-game-liart-eight.vercel.app/"]
    }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
app.get('/test', (req, res) => {
  res.send({res:"hii"});
});

io.on('connection', (socket) => {
    socket.on('connect',()=>{
        console.log('a new user arrived')
    })
    socket.on('disconnect',()=>{
        console.log("user has disconnected")
    })
  });

server.listen(3000, () => {
  console.log('server running...');
});