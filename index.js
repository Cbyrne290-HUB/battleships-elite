const express = require('express');
const app = express();
const { spawn } = require('child_process');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
    const game = spawn('python3', ['run.py']);

    game.stdout.on('data', (data) => {
        socket.emit('output', data.toString());
    });

    game.stderr.on('data', (data) => {
        socket.emit('output', data.toString());
    });

    socket.on('input', (data) => {
        game.stdin.write(data + '\n');
    });

    game.on('close', () => {
        socket.emit('output', '\r\nGame over. Refresh to play again.\r\n');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});