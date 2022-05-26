const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let client = require("socket.io-client");
let socket = client.connect("http://127.0.0.1:8080")


socket.on('connect', function () {

    console.log("connected!")

    socket.on('sendPos', function(mouse) {
        console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
    });
})