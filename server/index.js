const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
});

const users = require('./users');
const messages = require('./messages');

app.use(router);
server.listen(PORT, () => console.log(`Server has startted on port ${PORT}`));

const nsp = io.of(/\/[0-9]*/);

nsp.on('connection', (socket) => {
    console.log('We have a new connection!!');

    socket.on('join2', ({ userId, namespaceId}, callback) => {
        console.log('User joined... ',userId)
        // socket.join(userId);
        nsp.emit('roomData', { users: users.getUsersInNamespace(namespaceId)});
        callback()
        // console.log('hey2')
    })

    socket.on('joinChat', ({ userId }, callback) => {
        console.log('User Chat joined... ',userId)
        // console.log(typeof userId)
        socket.join(userId);
        callback()
    })

    socket.on('leave', ({ userId }, callback) => {
        console.log('leaving... ', userId)
        socket.leave(userId);
        callback()
    })
    

    socket.on('sendMessage', ({ fromUserId, toUserId, message}, callback) => {
        console.log(socket.id, fromUserId, toUserId);
        // console.log(typeof fromUserId, typeof toUserId)
        // const user = users.getUser(fromUserId);

        const newMessage = messages.addMessage(fromUserId, toUserId, message)

        // console.log('message... - ', newMessage);
        
        socket.to(toUserId).emit('messageReceived', { message: newMessage });
        nsp.to(fromUserId).emit('messageSent', { message: newMessage });
        callback();
    });

    socket.on('disconnect', () => {
        console.log('Refreshed');
        // const user = users.removeUser(socket.id);

        // if(user) {
            // nsp.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left!`});
            // nsp.emit('roomData', { users: users.getUsersInNamespace(user.namespaceId) });
        // }
    })

    socket.on('userLeft', (userId, callback) => {
        const user = users.getUserDetails(userId)
        if(user) {
            users.removeUser(userId);
            console.log(user.namespaceId, 'socket left')
            nsp.emit('roomData', { users: users.getUsersInNamespace(user.namespaceId)});
        }
        callback()
    })

    console.log(socket.id);
});

