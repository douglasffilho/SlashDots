function updateMyBoardData(playersData) {
    var myData = playersData.find(function(player) {
        return player.id === playerId;
    });

    if (!!myData) {
        document.querySelector('.board .me .id').innerHTML = myData.name;
        document.querySelector('.board .me .dots .value').innerHTML = myData.dots;
    }
}

function updateLeaderBoardData(playersData) {
    var leaderData = playersData.sort(function(player, nextPlayer) {
        return nextPlayer.dots - player.dots;
    })[0];

    if (!!leaderData) {
        document.querySelector('.board .leader .id').innerHTML = leaderData.name;
        document.querySelector('.board .leader .dots .value').innerHTML = leaderData.dots;
    }
}

function updateOthersBoardData(playersData) {
    var otherPlayers = playersData
        .filter(function(player) {
            return player.id !== playerId;
        })
        .sort(function(player, nextPlayer) {
            return nextPlayer.dots - player.dots;
        });

    var playersHtml = otherPlayers.map(function(player) {
            return ''
            +'<div class="player">'
            +'<p class="id">' + player.name + '</p>'
            +'<p class="dots"><strong class="value">' + player.dots + '</strong> dots</p>'
            +'</div>';
        })
        .join('\n');

    document.querySelector('.board .others').innerHTML = playersHtml;
}

function updateBoard(playersData) {
    updateMyBoardData(playersData);
    updateLeaderBoardData(playersData);
    updateOthersBoardData(playersData);
}
