/* We do not call the DbConnection here, we use it on the main Server.js or the Test case */
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
   // all atributes for User defined here.
   Name: String,
   MinPlayers: Number,
   MaxPlayers: Number,
   GameType: String    // no comma in the last one
}, {versionKey: false}); 

const gameModel = mongoose.model('game', gameSchema);
exports.gameModel = gameModel;

exports.read = async function() {
   const games = await gameModel.find();
   return games;
}

exports.create = async function(game) {
   const mongoGame = new gameModel(game);
   await mongoGame.save();
   return mongoGame;
}

exports.update = async function(id, game) {
   await gameModel.findByIdAndUpdate(id, game);
}

exports.del = async function(id) {
   await gameModel.findByIdAndDelete(id);   
}
