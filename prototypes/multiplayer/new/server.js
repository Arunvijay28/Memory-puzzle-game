const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const rooms={};

io.on('connection',(socket)=>{
    
    console.log("user connected");
    
    socket.on('CreateRoom',roomname=>{
        rooms[roomname]=[];
        socket.join(roomname);
    });

    socket.on('JoinRoom',roomname => {
        socket.join(roomname);
        io.to(roomname).emit("PlayerJoined");
    });

    socket.on('StartGame',roomname =>{
        const sequence=generatesequence();
        console.log(sequence);
        rooms[roomname]=sequence;
        io.to(roomname).emit('SequenceGenerated',sequence);
    });

    socket.on('playerInput', ({ roomName, color }) => {
        console.log("hi");
        const expectedColor = rooms[roomName].shift();

        if (color === expectedColor) {
            if (rooms[roomName].length === 0) {
                io.to(roomName).emit('roundComplete');
            }
        } else {
            io.to(roomName).emit('gameOver');
        }
    });
});

const generatesequence=()=>{
    colors=['blue','red','green','yellow'];
    const sequence = [];
    for (let i = 0; i < 4; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
    }
    return sequence;
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});