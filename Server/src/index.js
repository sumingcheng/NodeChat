const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {findUserName, replaceUser} = require('./utils')

const PORT = process.env.NODE_ENV === 'production' ? 33445 : 33445
const BASE_URL = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'
console.log('当前环境为', process.env.NODE_ENV)

const app = express()
const allowedOrigins = ['http://82.157.118.166:20007', 'http://127.0.0.1:20007', 'http://localhost:20007']

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

const server = http.createServer(app)
const ioOptions = {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
}

const io = socketIO(server, ioOptions)
let onlineUsers = []

io.on('connection', (socket) => {
  const username = socket.handshake.query.username
  const newUser = {username, id: socket.id}

  if (findUserName(onlineUsers, username)) {
    replaceUser(onlineUsers, newUser)
  } else {
    onlineUsers.push(newUser)
  }

  console.log(`用户『${username}』已连接: ${socket.id}`)
  io.emit('onlineUsers', onlineUsers)

  socket.on('ServerMessage', (msgObj) => {
    const message = {
      ...msgObj,
      timestamp: Date.now(),
      id: socket.id,
      username
    }
    io.emit('Client', message)
  })

  socket.on('disconnect', () => {
    console.log(`用户${username}已断开连接：${socket.id}`)
    onlineUsers = onlineUsers.filter(user => user.id !== socket.id)
    io.emit('onlineUsers', onlineUsers)
  })
})

server.listen(PORT, BASE_URL, () => {
  console.log(`服务运行在 http://${BASE_URL}:${PORT} 端口`)
})
