var canvas = null;
var PLAYER_WIDTH = 2;
var PLAYER_HEIGHT = 1;
var PLAYER_INITIAL_X = 15;
var PLAYER_INITIAL_Y = 15;
var MY_DOT_COLOR = 'green';
var OTHERS_DOT_COLOR = 'gray';

function renderPlayer(x, y, self) {
    if (!self) {
        canvas.globalAlpha = 0.2;
    }
    canvas.fillStyle = !!self ? MY_DOT_COLOR : OTHERS_DOT_COLOR;
    canvas.fillRect((PLAYER_WIDTH * x), (PLAYER_HEIGHT * y), PLAYER_WIDTH, PLAYER_HEIGHT);
    canvas.globalAlpha = 1.0;
}

function initPlayer() {
    renderPlayer(PLAYER_INITIAL_X, PLAYER_INITIAL_Y, true);
}

function updateScenario(players) {
    canvas.clearRect(0, 0, 100, 100);
    players.forEach(function(player) {
        renderPlayer(player.position.x, player.position.y, player.id === playerId);
    });
}

(function() {
    console.log('canvas ready');
    canvas = document.querySelector('canvas').getContext('2d');
    canvas.scale(5,5);

    initPlayer();
})();
