import DateUtils from './date-utils';
import config from './config';

const playersData = {};

const movementMap = {
    'DOWN': id => {
        const position = playersData[id].position.y;
        if (position < config.FIELD_Y_AXIS_LIMITS.end) {
            playersData[id].position.y += config.PLAYER_Y_AXIS_STEP;
        }
    },
    'UP': id => {
        if (playersData[id].position.y > config.FIELD_Y_AXIS_LIMITS.begin) {
            playersData[id].position.y -= config.PLAYER_Y_AXIS_STEP;
        }
    },
    'LEFT': id => {
        if (playersData[id].position.x > config.FIELD_X_AXIS_LIMITS.begin) {
            playersData[id].position.x -= config.PLAYER_X_AXIS_STEP;
        }
    },
    'RIGHT': id => {
        if (playersData[id].position.x < config.FIELD_X_AXIS_LIMITS.end) {
            playersData[id].position.x += config.PLAYER_X_AXIS_STEP;
        }
    }
};

const Players = {

    create: id => {
        playersData[id] = {
            id,
            name: `Player-${Object.keys(playersData).length}`,
            dots: 0,
            position: { x: config.PLAYER_INITIAL_X, y: config.PLAYER_INITIAL_Y },
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
