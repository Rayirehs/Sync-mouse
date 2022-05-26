let robot = require("robotjs");
const ini = require('ini');
const fs = require('fs');
const configfilepath = __dirname + '/config.ini';
let config = ini.parse(fs.readFileSync(configfilepath, 'utf-8'));
const express = require('express');
const app = express();
const PORT = config.setup.port
const masterIp = config.setup.ipMaster



    if(config.setup.mode == "master"){

        console.log("im the master...")
       // create the master server
       const { Server } = require("socket.io");
       const http = require('http');
       const server = http.createServer(app);
       const io = new Server(server);
       
       
            
        // Add a connect listener
        io.on('connection', function(socket)
        {
            console.log('Client connected.');

            // Disconnect listener
            socket.on('disconnect', function() {
                console.log('Client disconnected.');
            });
        });



        server.listen(PORT, () => {
            console.log(`server listenning  on port ::: ${ PORT }`)
        });

    }
    else{

        console.log("im the slave...")
        const express = require('express');
        const app = express();
        const server = require('http').createServer(app);
        const io = require('socket.io')(server);
        let client = require("socket.io-client");
        //connect to the server
        let socket = client.connect("http://"+masterIp+":"+PORT)

        socket.on('connect', function () {

            console.log("connected!")
        })
    }

    /*console.log(config)
    let mouse=robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);*/


//Move the mouse down by 100 pixels.
//robot.moveMouse(mouse.x,mouse.y+1200);

//Left click!
//robot.mouseClick();