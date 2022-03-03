#!/bin/bash

#stop
forever stop server.js

curdate=$(date "+%Y-%m-%d_%H%M%S")

#start
forever start -l "/home/www/node/mybScmSvr/logs/${curdate}_console.log" -w server.js

#tail log
tail -f "/home/www/node/mybScmSvr/logs/${curdate}_console.log"

