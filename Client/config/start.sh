#!/bin/bash

# 构建项目
npm run build

# 启动预览服务器
pm2 start npm --name NodeChatClient20007 -- run preview
