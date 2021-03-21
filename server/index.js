const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://3.12.107.87",
        methods: ["GET", "POST"],
        credentials: true
      }
});

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

app.use(router);
server.listen(PORT, () => console.log(`Server has startted on port ${PORT}`));

io.on('connection', (socket) => {
    console.log('We have a new connection!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const {error, user} = addUser({ id: socket.id, name, room});
        console.log(user);

        if(error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to  the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room ${user.room}`});

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(message);
        io.to(user.room).emit('message', { user: user.name, text: message});
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left');
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left!`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});

