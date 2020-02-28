var socket = null;
var playerId = null;
var playerName = null;

function movePlayer(direction) {
    socket.emit('move', {player: playerId, direction: direction});
}

(function() {
    socket = io('http://localhost:8081');

    socket.on('connect', function() {
        playerId = socket.id
    });

    socket.on('state', function(state) {
        var playersData = Object.keys(state.players).map(function(playerData) {
            return state.players[playerData];
        });

        var dotsData = state.dots;

        updateScenario(playersData, dotsData);
        updateBoard(playersData);
    });

})();