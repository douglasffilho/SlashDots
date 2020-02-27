import DateUtils from './date-utils';

const PLAYER_INITIAL_X = 28;
const PLAYER_INITIAL_Y = 15;
const PLAYER_X_AXIS_STEP = 2;
const PLAYER_Y_AXIS_STEP = 1;

const playersData = {};

const movementMap = {
    'DOWN': id => {
        playersData[id].position.y += PLAYER_Y_AXIS_STEP;
    },
    'UP': id => {
        playersData[id].position.y -= PLAYER_Y_AXIS_STEP;
    },
    'LEFT': id => {
        playersData[id].position.x -= PLAYER_X_AXIS_STEP;
    },
    'RIGHT': id => {
        playersData[id].position.x += PLAYER_X_AXIS_STEP;
    }
};

const Players = {

    create: id => {
        playersData[id] = {
            id,
            name: `Player-${Object.keys(playersData).length}`,
            dots: 0,
            position: { x: PLAYER_INITIAL_X, y: PLAYER_INITIAL_Y },
            lastMovement: DateUtils.now()
        };
    },

    move: (id, direction) => {
        if (playersData[id]) {
            movementMap[direction](id);
            playersData[id].lastMovement = DateUtils.now();
        }
    },

    unregister: id => {
        delete playersData[id];
    },

    state: () => {
        return playersData;
    }

}

export default Players;
