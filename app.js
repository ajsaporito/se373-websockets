const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const openaiResponse = require('./services/openaiService');

const getChatbotResponse = async (msg) => {
    return await openaiResponse(msg);
}

app.use(express.static(path.join(__dirname, 'public')));

const users = new Set();

io.on('connection', (socket) => {
    socket.on('set username', (username) => {
        socket.username = username;
        console.log(`User set username: ${username}`);
        users.add(username);
        io.emit('user list', Array.from(users));
    })

    socket.on('chat message', async (msg) => {
        console.log(`Message from ${socket.id}: ${msg}`);
        io.emit('chat message', `${socket.username}: ${msg}`);

        // @bot directs messages to the API 
        if (msg.toLowerCase().includes('@bot')) {
            const response = await getChatbotResponse(msg);
            io.emit('chat message', `Bot: ${response}`);
        }
    })

    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.username ? socket.username : "Unknown");
        users.delete(socket.username);
        io.emit('user list', Array.from(users));
    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

module.exports = app;
