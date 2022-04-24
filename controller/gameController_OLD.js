const gamesDAO = require('../model/gamesDAO');

exports.get = function(req,res,next){
    res.status(200); // Ok status
    res.send(gamesDAO.read()); // Sending the array
    res.end(); // Ends the response (optional)
 };

exports.create = function(req,res,next) {
    let newGame = {};
    newGame._id = generateNewID();
    newGame.Name = req.body.gameName;
    newGame.MinPlayers = req.body.minPlayers;
    newGame.MaxPlayers = req.body.maxPlayers;
    newGame.GameType = req.body.gameType;

    gamesDAO.create(newGame);
    res.redirect('/games/games.html');
}
function generateNewID() {
    let currentGames = gamesDAO.read();
    if(currentGames.length === 0) {
        return 1;
    }
    // get id of last entry and add one to it
    let posOfLargestIndex = 0;
    for(let i = 0; i < currentGames.length; i++) {
        if(currentGames[i]._id > currentGames[posOfLargestIndex]._id) {
            posOfLargestIndex = i;
        }
    }
    return currentGames[posOfLargestIndex]._id + 1; 
}

exports.update = function(req,res,next) {
    let updatedGame = {};
    updatedGame._id = parseInt(req.body._id);
    updatedGame.Name = req.body.gameName;
    updatedGame.MinPlayers = req.body.minPlayers;
    updatedGame.MaxPlayers = req.body.maxPlayers;
    updatedGame.GameType = req.body.gameType;
    
    gamesDAO.update(updatedGame._id, updatedGame);
    res.redirect('/games/games.html');
}

exports.del = function(req,res,next) {
    let id = parseInt(req.params.id);
    gamesDAO.del(id);
    res.redirect('/games/games.html');
}

