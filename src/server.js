import express from 'express';
import http from 'http';
import path from 'path';
import socket from 'socket.io';
import Players from './players';
import ejs from 'ejs';
import cron from 'node-cron';
import DateUtils from './date-utils';

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

const tasks = [];

const io = socket(server);
io.on('connection', socket => {
    console.log(`Player ${socket.id} connected`);
    Players.create(socket.id);

    socket.on('move', moveData => {
        Players.move(moveData.player, moveData.direction);
        socket.broadcast.emit('moved', Players.state());
        socket.emit('moved', Players.state());
    });

    if (tasks.length < 1) {
        tasks.push(cron.schedule("0 * * * * *", () => {
            console.log("removing idle players");
            Object.keys(Players.state())
                .map(playerId => Players.state()[playerId])
                .filter(player => {
                    return DateUtils.dateIsBeforeNow(player.lastMovement, 30000)
                })
                .forEach(player => {
                    Players.unregister(player.id);
                    socket.broadcast.emit('moved', Players.state());
                    socket.emit('moved', Players.state());
                });
        }));
    }

});
