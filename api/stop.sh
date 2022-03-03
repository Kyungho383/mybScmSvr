#!/bin/bash

#stop
#kill -9 ps -ef|grep node|awk '{print $2}'
forever stop server.js
forever list
#start
#forever start -w server.js -l ./log/curLog.log
#forever start -l ./log/current.log -w server.js
#forever start -w server.js

#ode server.js > ./log/curLog.log &

#tail -f ./log/current.log


