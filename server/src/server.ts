import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello, world!');
});

export default server;
