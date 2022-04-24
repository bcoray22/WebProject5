var fs = require('fs');

let games = readFromGamesFile();

 exports.read = function() {
   return readFromGamesFile();
 }
 function readFromGamesFile() {
   let rawDataOfGames = fs.readFileSync('./games.json');
   let games = JSON.parse(rawDataOfGames);
   return games;
 }

 exports.create = function(newGame) {
     games.push(newGame);
     saveToGamesFile();
 }

 exports.update = function(id, updatedGame) {
   let pos = getPosOfReqGame(id);
   if(pos != null) {
      games[pos] = updatedGame; 
   }
   saveToGamesFile();
 }

 exports.del = function(id) {
    let pos = getPosOfReqGame(id);
    if(pos != null) {
        games.splice(pos, 1);
    }
    saveToGamesFile();
 }

 function getPosOfReqGame(id) {
    let pos = null;
    for(let i=0; i<games.length; i++) {
        if(games[i]._id === id) {
            pos = i; break;
        }
    }
    return pos;
 }

 function saveToGamesFile() {
    var stringifiedGames = JSON.stringify(games);
    fs.writeFileSync('./games.json', stringifiedGames, (err) => {
       if (err) { 
          console.log(err); 
        } 
      });
   }