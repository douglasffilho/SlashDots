import DateUtils from './date-utils';

const PLAYER_FIELD_X_AXIS_LIMITS = {begin: 0, end: 29};
const PLAYER_FIELD_Y_AXIS_LIMITS = {begin: 0, end: 29};
const PLAYER_INITIAL_X = 15;
const PLAYER_INITIAL_Y = 15;
const PLAYER_X_AXIS_STEP = 1;
const PLAYER_Y_AXIS_STEP = 1;

const playersData = {};

const movementMap = {
    'DOWN': id => {
        const position = playersData[id].position.y;
        if (position < PLAYER_FIELD_Y_AXIS_LIMITS.end) {
            playersData[id].position.y += PLAYER_Y_AXIS_STEP;
        }
    },
    'UP': id => {
        if (playersData[id].position.y > PLAYER_FIELD_Y_AXIS_LIMITS.begin) {
            playersData[id].position.y -= PLAYER_Y_AXIS_STEP;
        }
    },
    'LEFT': id => {
        if (playersData[id].position.x > PLAYER_FIELD_X_AXIS_LIMITS.begin) {
            playersData[id].position.x -= PLAYER_X_AXIS_STEP;
        }
    },
    'RIGHT': id => {
        if (playersData[id].position.x < PLAYER_FIELD_X_AXIS_LIMITS.end) {
            playersData[id].position.x += PLAYER_X_AXIS_STEP;
        }
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
