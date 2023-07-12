const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Dotenv = require('dotenv')
const {findUserName, replaceUser} = require('./utils');
Dotenv.config();

let BASE_URL, PORT
if (process.env.NODE_ENV === 'production') {
  PORT = 33445
  BASE_URL = '0.0.0.0'
} else {
  PORT = 33445
  BASE_URL = "127.0.0.1"
}
console.log("当前环境为", process.env.NODE_ENV)

const app = express();
const allowedOrigin = ["http://82.157.118.166:20007", "http://127.0.0.1:20007", "http://localhost:20007"];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

const server = http.createServer(app);
const options = {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
}

const io = socketIO(server, options);
// 创建在线用户列表
let onlineUsers = [];

io.on('connection', function (socket) {
  const username = socket.handshake.query.username;
  let newUser = {
    username: username,
    id: socket.id
  }
  // 如果用户名已经存在于在线用户列表中，则断开这个连接
  if (findUserName(onlineUsers, username)) {
    replaceUser(onlineUsers, newUser)
  } else {
    onlineUsers.push(newUser);
  }

  console.log(`用户『${username}』已连接: ${socket.id}`);
  io.emit('onlineUsers', onlineUsers);

  socket.on('ServerMessage', function (msgObj) {
    msgObj.timestamp = Date.now();
    msgObj.id = socket.id;
    msgObj.username = username;
    io.emit('Client', msgObj);
  });

  socket.on('disconnect', function () {
    console.log(`用户${username}已断开连接：${socket.id}`);

    // 从在线用户列表中移除断开连接的用户
    onlineUsers = onlineUsers.filter(user => user.id !== socket.id);

    // 将更新后的在线用户列表发送给所有连接的客户端
    io.emit('onlineUsers', onlineUsers);
  });
});

server.listen(PORT, `${BASE_URL}`, function () {
  console.log(`服务运行在 http://${BASE_URL}:${PORT} 端口`);
});
