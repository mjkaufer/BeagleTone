var io = require('socket.io-client');
var b = require('bonescript');

var socket = io('http://192.168.7.1');
 
var pot1 = "P9_40"
var pot2 = "P9_38";

var refreshRate = 100;


console.log("starting")

loop();


function loop() {
    
    // refreshRate = parseInt((Math.sin(t)+1)*250+500)
    try{
        var p1Val = b.analogRead(pot1);
        var p2Val = b.analogRead(pot2);
        socket.emit('potentiometer',{pot1: pot1, pot2: pot2})
        console.log(p1Val, p2Val)
    } catch(e){}

    
    // setTimeout(loop, 1000/refreshRate);
    setTimeout(loop)

}

// setInterval(loop, 1000/refreshRate);
/*
    t = 1000/fps
*/
socket.emit('potentiometer', { my: 'data' });