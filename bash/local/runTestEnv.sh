#!/bin/sh

ps -ef|grep redis-server|grep -v grep
if [ $? -ne 0 ]
then
  echo "Start redis"
  sudo redis-server /usr/local/etc/redis.conf
else
  echo "Redis is running..."
fi

ps -ef|grep mongod|grep -v grep
if [ $? -ne 0 ]
then
  echo "Start mongoDB"
  sudo mongod -f /usr/local/etc/mongod.conf
else
  echo "MongoDB is running..."
fi

echo "You could run \"npm start\" to start your app..."
