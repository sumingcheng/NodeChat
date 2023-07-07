const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Docenv = require('dotenv')
Docenv.config();

const PORT = process.env.PORT

// 创建一个新的 express 应用
const app = express();

// 创建一个新的 http 服务器，使用 express 应用
const server = http.createServer(app);
const options = {
  cors: {
    origin: 'http://127.0.0.1:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
}
// 创建一个新的 Socket.IO 实例，使用 http 服务器
const io = socketIO(server, options);

// 当有新的客户端连接时，执行以下回调函数
io.on('connection', function (socket) {
  console.log('A user connected: ' + socket.id);

  // 当客户端发送 "chat message" 事件时，执行以下回调函数
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);

    // 将 "chat message" 事件广播给所有客户端，包括发送这个事件的客户端
    io.emit('chat message', msg);
  });

  // 当客户端断开连接时，执行以下回调函数
  socket.on('disconnect', function () {
    console.log('A user disconnected: ' + socket.id);
  });
});

// 启动服务器，监听 3000 端口
server.listen(PORT, function () {
  console.log(`Server is listening on *:${PORT}`);
});
