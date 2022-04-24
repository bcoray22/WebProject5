const gamesDao = require('../model/gamesDAO');
let newGame = {};


test('Reading All Games',function() {
    let numberOfGames = gamesDAO.read.length();    
    expect(numberOfGames).toBeGreaterThan(0);
});

test('Create new game', function() {
    let numberOfGamesBeforeCreation = gamesDao.read.length();
    newGame = {_id: 1000, Name: 'GameToBeCreated', MinPlayers: 4, MaxPlayers: 8, GameType: 'Combat'};
    gamesDao.create(newGame);
    let numberOfGamesAfterCreation = gamesDao.read.length();
    expect(numberOfGamesAfterCreation - numberOfGamesBeforeCreation).toBe(1);
})

test('Delete existing game', function() {
    let numberOfGamesBeforeDel = gamesDao.read.length();
    gamesDao.del(newGame._id);
    let numberOfGamesAfterDel = gamesDao.read.length();
    expect(numberOfGamesBeforeDel - numberOfGamesAfterDel).toBe(1); 
});

test('Find existing game', function() {
    let gameToBeFound = {_id: 1002, Name: 'GameToBeFound', MinPlayers: 4, MaxPlayers: 8, GameType: 'Combat'};
    gamesDao.create(gameToBeFound);
    let pos = gamesDao.getPosOfReqGame(gameToBeFound._id);
    expect(pos).toBe(gamesDao.read.length() - 1);    
})

test('Fail at finding deleted game', function() {
    newGame = {_id: 1003, Name: 'GameToBeDeleted', MinPlayers: 4, MaxPlayers: 8, GameType: 'Combat'};
    gamesDao.create(newGame);
    gamesDao.del(newGame._id);

    let pos = gamesDao.getPosOfReqGame(newGame._id);
    expect(pos).toBe(null);    
});


test('EditGame keeps length of games the same', function() {
    let numberOfGamesBeforeEdit = gamesDao.read.length;

    let newGame = {_id: 2000, Name: UpdatedGame, MinPlayers: 2, MaxPlayers: 4, GameType: 'Mining'};
    gamesDao.create(newGame);

    let editedGame = {_id: newGame._id , Name: UpdatedGame, MinPlayers: 2, MaxPlayers: 4, GameType: 'Combat'};
    gamesDao.update(newGame._id, editedGame);
    let numberOfGamesAfterDel = gamesDao.read.length;
    expect(numberOfGamesAfterDel - numberOfGamesBeforeEdit).toBe(1);
});