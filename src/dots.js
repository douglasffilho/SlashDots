import config from './config';

const MEGA_DOT_VALUE = 5;
const DEFAULT_DOT_VALUE = 1;

const dots = [];

const handleXCoordinatesOnLimits = x => {
    const x1 = (x > config.FIELD_X_AXIS_LIMITS.end) ? config.FIELD_X_AXIS_LIMITS.end : x;
    const newX = (x1 < config.FIELD_X_AXIS_LIMITS.begin) ? config.FIELD_X_AXIS_LIMITS.begin : x1;

    return newX;
}

const handleYCoordinatesOnLimits = y => {
    const y1 = (y > config.FIELD_Y_AXIS_LIMITS.end) ? config.FIELD_Y_AXIS_LIMITS.end : y;
    const newY = (y1 < config.FIELD_Y_AXIS_LIMITS.begin) ? config.FIELD_Y_AXIS_LIMITS.begin : y1;

    return newY;
}

const handleXYCoordinatesOnLimits = (x, y) => {
    const newX = handleXCoordinatesOnLimits(x);
    const newY = handleYCoordinatesOnLimits(y);

    return {newX, newY};
}

const Dots = {

    createMegaDot(x, y) {
        const { newX, newY } = handleXYCoordinatesOnLimits(x, y);
        dots.push({ x: newX, y: newY, value: MEGA_DOT_VALUE, isMegaDot: true });
    },

    createDot(x, y) {
        const { newX, newY } = handleXYCoordinatesOnLimits(x, y);
        dots.push({ x: newX, y: newY, value: DEFAULT_DOT_VALUE, isMegaDot: false });
    },

    eat(x, y) {
        const validDots = dots.filter(dot => dot.x !== x && dot.y !== y);
        const oldDots = JSON.parse(JSON.stringify(dots));

        dots = validDots;

        return oldDots
            .filter(dot => dot.x === x && dot.y === y)
            .map(dot => dot.value)
            .reduce((sum, value) => sum + value, 0);
    },

    state() {
        return dots;
    }

};

export default Dots;