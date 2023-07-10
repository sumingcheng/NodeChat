const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Dotenv = require('dotenv')
Dotenv.config();

const PORT = process.env.PORT
// 创建一个新的 express 应用
const app = express();
const allowedOrigin = "http://82.157.118.166";
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", allowedOrigin); // 允许所有来源的请求
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // 允许的请求头字段
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); // 允许的 HTTP 方法
  next();
});

// 创建一个新的 http 服务器，使用 express 应用
const server = http.createServer(app);
const options = {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
}
// 创建一个新的 Socket.IO 实例，使用 http 服务器
const io = socketIO(server, options);

// 当有新的客户端连接时，执行以下回调函数
io.on('connection', function (socket) {
  console.log('用户已连接: ' + socket.id);

  // 当客户端发送 "chat message" 事件时，执行以下回调函数
  socket.on('ServerMessage', function (msgObj) {
    // 为消息对象添加一个时间戳
    msgObj.timestamp = Date.now();
    msgObj.id = socket.id
    // 将 "Client" 事件广播给所有客户端，包括发送这个事件的客户端
    io.emit('Client', msgObj);
  });

  // 当客户端断开连接时，执行以下回调函数
  socket.on('disconnect', function () {
    console.log('用户已断开连接：' + socket.id);
  });
});

// 启动服务器，监听 3000 端口
server.listen(PORT, '0.0.0.0', function () {
  console.log(`服务运行在 http://0.0.0.0:${PORT} 端口`);
});
