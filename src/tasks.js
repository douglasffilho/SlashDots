import cron from 'node-cron';
import Players from './players';
import DateUtils from './date-utils';
import config from './config';
import Dots from './dots';

let tasksSocket = null;

const removeLast30SecondsNoMovementsPlayersEachMinute = () => {
    return cron.schedule("0 * * * * *", () => {
        Object.keys(Players.state())
            .map(playerId => Players.state()[playerId])
            .filter(player => DateUtils.dateIsBeforeNow(player.lastMovement, 30000))
            .forEach(player => {
                Players.unregister(player.id);

                tasksSocket.broadcast.emit('state', { players: Players.state(), dots: Dots.state() });
                tasksSocket.emit('state', { players: Players.state(), dots: Dots.state() });
            });
    }, {
        scheduled: false
    });
}

const create1To3RandomDotsEach3Seconds = () => {
    return cron.schedule("*/3 * * * * *", () => {
        const numberOfDots = Math.floor(Math.random() * 3) + 1;

        const dots = new Array(numberOfDots)
            .fill(undefined)
            .map(item => {
                const xRange = config.FIELD_X_AXIS_LIMITS.end - config.FIELD_X_AXIS_LIMITS.begin;
                const yRange = config.FIELD_Y_AXIS_LIMITS.end - config.FIELD_Y_AXIS_LIMITS.begin;

                const x = Math.floor(Math.random() * xRange) + 1;
                const y = Math.floor(Math.random() * yRange) + 1;

                const isMegaDot = Math.floor(Math.random() * 2) === 1 ? true : false;

                return { x, y, isMegaDot }
            });

        dots.forEach(dot => {
            const x = dot.x;
            const y = dot.y;

            if (dot.isMegaDot) {
                Dots.createMegaDot(x, y);
            } else {
                Dots.createDot(x, y);
            }
        });

        tasksSocket.broadcast.emit('state', { players: Players.state(), dots: Dots.state() });
        tasksSocket.emit('state', { players: Players.state(), dots: Dots.state() });
    }, {
        scheduled: false
    });
}

const tasks = [
    removeLast30SecondsNoMovementsPlayersEachMinute(),
    create1To3RandomDotsEach3Seconds()
];

const Tasks = {

    start(socket) {
        tasksSocket = socket;
        tasks.forEach(task => {
            task.start();
        });
    }

}

export default Tasks;