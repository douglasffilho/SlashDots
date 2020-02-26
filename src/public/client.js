function renderBoardItem(item) {
    return `<p><strong>${item.id}</strong>${item.isMe ? ' - (Eu)' : ''}: <strong>${item.dots}</strong></p>`;
}

function renderBoard(data) {
    var board = Object.keys(data)
        .map(function(itemId) { return { id: itemId,...data[itemId]}; })
        .sort(function(itemA, itemB) { return itemB.dots - itemA.dots })
        .map(function(item) {
            if (item.id === clientId) {
                item.isMe = true;
            }

            return renderBoardItem(item);
        })
        .join('\n');
    $('.board').html(board);
}
