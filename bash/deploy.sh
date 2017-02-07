#!/bin/sh

WEB_PATH='/home/ec2-user/cctvnews/ChinaStartup'
WEB_USER='ec2-user'
WEB_USERGROUP='ec2-user'

echo "Start deployment"
cd $WEB_PATH

echo "Adding id_rsa"
eval "$(ssh-agent -s)"
ssh-add /home/ec2-user/.ssh/id_rsa

echo "Pulling source code..."
git pull

# echo "Changing permissions..."
# sudo chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH

echo "Finished!"