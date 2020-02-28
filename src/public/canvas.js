var canvas = null;
var DOT_WIDTH = 2;
var DOT_HEIGHT = 1;
var PLAYER_INITIAL_X = 15;
var PLAYER_INITIAL_Y = 15;
var MY_DOT_COLOR = 'green';
var OTHERS_DOT_COLOR = 'gray';
var DOT_COLOR = 'yellow';
var MEGA_DOT_COLOR = 'orange';

function renderPlayer(x, y, self) {
    if (!self) {
        canvas.globalAlpha = 0.2;
    }
    canvas.fillStyle = !!self ? MY_DOT_COLOR : OTHERS_DOT_COLOR;
    canvas.fillRect((DOT_WIDTH * x), (DOT_HEIGHT * y), DOT_WIDTH, DOT_HEIGHT);
    canvas.globalAlpha = 1.0;
}

function renderDot(x, y, isMegaDot) {
    canvas.globalAlpha = 1.0;
    canvas.fillStyle = !!isMegaDot ? MEGA_DOT_COLOR : DOT_COLOR;
    canvas.fillRect((DOT_WIDTH * x), (DOT_HEIGHT * y), DOT_WIDTH, DOT_HEIGHT);
}

function initPlayer() {
    renderPlayer(PLAYER_INITIAL_X, PLAYER_INITIAL_Y, true);
}

function updateScenario(players, dots) {
    canvas.clearRect(0, 0, 100, 100);
    players.forEach(function(player) {
        renderPlayer(player.position.x, player.position.y, player.id === playerId);
    });
    dots.forEach(function(dot) {
        renderDot(dot.x, dot.y, dot.isMegaDot);
    });
}

(function() {
    canvas = document.querySelector('canvas').getContext('2d');
    canvas.scale(5,5);

    initPlayer();
})();
