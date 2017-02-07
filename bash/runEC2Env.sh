#!/bin/sh

ps -ef|grep redis-server|grep -v grep
if [ $? -ne 0 ]
then
  echo "Start redis"
  sudo redis-server /etc/redis.conf
else
  echo "Redis is running..."
fi

ps -ef|grep mongod|grep -v grep
if [ $? -ne 0 ]
then
  echo "Start mongoDB"
  sudo mongod -f /etc/mongod.conf
else
  echo "MongoDB is running..."
fi

echo "PM2 start process"
sudo pm2 start process.json