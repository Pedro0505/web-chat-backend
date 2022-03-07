const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://web-chat-front-swart.vercel.app/*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`Usuário Id: ${socket.id} Sala: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    console.log(`O usuário ${data.user} Sala: ${data.room} Enviou a message: ${data.currMessage}`);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Online');
});
