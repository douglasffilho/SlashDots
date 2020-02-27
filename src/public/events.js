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

    socket.on('moved', function(state) {
        var playersData = Object.keys(state).map(function(playerData) {
            return state[playerData];
        });

        updateScenario(playersData);
        updateBoard(playersData);
    });

})();