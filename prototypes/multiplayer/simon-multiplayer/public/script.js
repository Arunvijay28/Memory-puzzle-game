const socket = io();

const createroom = document.getElementById("createRoomBtn");
const startbtn = document.getElementById("startBtn");
const joinbtn = document.getElementById("joinBtn");
const colors = document.querySelectorAll('.colorBtn');
let colorArray=[];


createroom.addEventListener('click', () => {
    const roomName = prompt('Enter Room Name:');
    socket.emit('CreateRoom', roomName);
});


startbtn.addEventListener('click', () => {
    const roomName = prompt('Enter Room Name:');
    socket.emit('StartGame', roomName);
});

joinbtn.addEventListener('click', () => {
    const roomname = document.getElementById("roomNameInput").value;
    socket.emit("JoinRoom", roomname);
});


colors.forEach(color => {
    color.addEventListener('click', () => {
        const selectedColor = color.dataset.color;
        socket.emit('playerInput', { roomName: 'abc', color: selectedColor });
    });
});

socket.on('PlayerJoined', () => {
    document.getElementById('message').textContent = 'Player joined the room';
});

socket.on('SequenceGenerated', sequence => {
    colorArray=[...sequence];
    document.getElementById('sequenceDisplay').textContent = sequence.join(' ');
});

socket.on('roundComplete', () => {
    document.getElementById('message').textContent = 'Round Complete!';
});

socket.on('gameOver', () => {
    document.getElementById('message').textContent = 'Game Over!';
});
