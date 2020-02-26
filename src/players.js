import DateUtils from './date-utils';

const PLAYER_INITIAL_X = 28;
const PLAYER_INITIAL_Y = 15;

const playersData = {};

const movementMap = {
    'DOWN': id => {
        playersData[id].position.y += 1;
    },
    'UP': id => {
        playersData[id].position.y -= 1;
    },
    'LEFT': id => {
        playersData[id].position.x -= 1;
    },
    'RIGHT': id => {
        playersData[id].position.x += 1;
    }
};

const Players = {

    create: id => {
        playersData[id] = {
            id,
            dots: 0,
            position: { x: PLAYER_INITIAL_X, y: PLAYER_INITIAL_Y },
            lastMovement: DateUtils.now()
        };
    },

    move: (id, direction) => {
        movementMap[direction](id);
        playersData[id].lastMovement = DateUtils.now();
    },

    unregister: id => {
        delete playersData[id];
    },

    state: () => {
        return playersData;
    }

}

export default Players;
