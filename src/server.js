import express from 'express';
import http from 'http';
import path from 'path';
import socket from 'socket.io';
import Players from './players';
import ejs from 'ejs';
import Tasks from './tasks';
import Dots from './dots';

const app = express();
const httpPort = 8081;
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.set('views', publicPath);
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    return res.render('index.html');
});

const server = http.createServer(app);

server.listen(httpPort, () => {
    console.log(`Server initialized on port ${httpPort}`);
});

const io = socket(server);
io.on('connection', socket => {
    Players.create(socket.id);

    socket.on('move', moveData => {
        Players.move(moveData.player, moveData.direction);

        socket.broadcast.emit('state', { players: Players.state(), dots: Dots.state() });
        socket.emit('state', { players: Players.state(), dots: Dots.state() });
    });

    Tasks.start(socket);

});
