import express from 'express';
import { createServer } from 'node:http';
import cors from "cors"
const app = express();
app.use(cors())
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
app.get('/test', (req, res) => {
  res.send({res:"hii"});
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});