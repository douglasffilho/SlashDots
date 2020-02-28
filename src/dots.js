const MEGA_DOT_VALUE = 5;
const DEFAULT_DOT_VALUE = 1;

const dots = [];

const Dots = {

    createMegaDot(x, y) {
        dots.push({x, y, value: MEGA_DOT_VALUE});
    },

    createDot(x, y) {
        dots.push({x, y, value: DEFAULT_DOT_VALUE});
    },

    eat(x, y) {
        
    }

};

export default Dots;