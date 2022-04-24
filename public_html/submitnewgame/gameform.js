let games = require('../../model/gamesDAO');

function showConfirmSubmissionButton() {
    document.getElementById("confirmSubmitButton").style.display = "block";
}

exports.newGame = function() {
    return assembleNewGame();
}

function assembleNewGame() {
    let id = getId();
    let name = getName();
    let minPlayers = getMinPlayers();
    let maxPlayers = getMaxPlayers();
    let type = getType();
    let newGame = {_id: id, Name: name, MinPlayers: minPlayers, MaxPlayers: maxPlayers, Type: type};
    return newGame;
}

function getID() {
    let currentGames = games.read;
    return currentGames[games.length() - 1]._id + 1; // get id of last entry and add one to it
}
function getName() {
    return document.getElementById('game').value;
}
function getMinPlayers() {
    return document.getElementById('minNumberOfPlayers').value;
}
function getMaxPlayers() {
    return document.getElementById('maxNumberOfPlayers').value;
}
function getType() {
    return document.getElementById('gameType').value;
}