const gamesDAOMongoose = require('../model/gamesDAOMongoose');

exports.get = async function(req,res,next){
    res.status(200); // Ok status
    res.send(await gamesDAOMongoose.read()); // Sending the array
    res.end(); // Ends the response (optional)
 };
 
exports.create = function(req,res,next) {
    let newGame = {};
    newGame._id = null;
    newGame.Name = req.body.gameName;
    newGame.MinPlayers = req.body.minPlayers;
    newGame.MaxPlayers = req.body.maxPlayers;
    newGame.GameType = req.body.gameType;

    gamesDAOMongoose.create(newGame);
    res.redirect('/games/games.html');
}

exports.update = async function(req,res,next) {
    let id = req.body._id;
    console.log("ID OF GAME TO UPDATE: " + id);

    let updatedGame = {};
    updatedGame.Name = req.body.gameName;
    updatedGame.MinPlayers = req.body.minPlayers;
    updatedGame.MaxPlayers = req.body.maxPlayers;
    updatedGame.GameType = req.body.gameType;
    
    await gamesDAOMongoose.update(id, updatedGame);
    res.redirect('/games/games.html');
}

exports.del = async function(req,res,next) {
    let id = req.params.id;
    await gamesDAOMongoose.del(id);
    res.redirect('/games/games.html');
}
