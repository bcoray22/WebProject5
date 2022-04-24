const db = require('../model/DbConnection');
const gamesDAO = require('../model/gamesDAOMongoose');

beforeAll(function(){ // Executed once before any tests here
  db.connect('test');
});
afterAll(async function(){ // Executed once after all tests 
  await db.disconnect(); 
}); 
afterEach(async function(){// Executed after every test
  await gamesDAO.deleteAll();
});

// Tests
test('Read All Games Test', async function() {
  let games = gamesDAO.read();
  expect(games.not.toBeNull());
})

test('Create Game Test', async function(){
  let newGame={Name: "NewGame", MinPlayers: 2, MaxPlayers: 10, GameType: 'Mining'};
  let createdGame = await gamesDAO.create(newGame);
  let found = await gamesDAO.read(createdGame._id);
  expect(found).not.toBeNull(); /* Not bad, but it has found as the main tested, while the created is not checked */    
  expect(createdGame._id).toEqual(found._id); /* This tests if the created was saved in the db by cheching the found login (logins should be unique) */ 
});

test('Delete Game Test', async function() {
  let newGame = {Name: "NewGameToBeDeleted", MinPlayers: 1, MaxPlayers: 2, GameType: 'Combat'};
  let createdGame = await gamesDAO.create(newGame);
  let found = await gamesDAO.read(createdGame._id);
  expect(found.not.toBeNull());

  gamesDAO.del(newGame);
  let gameModel = gamesDAO.gameModel;
  expect(gameModel.find(newGame).toBeNull());
});

test("Update Game Test", async function() {
  let newGame = {Name: "NewGameToBeUpdated", MinPlayers: 5, MaxPlayers: 20, GameType: 'Other'};
  let createdGame = await gamesDAO.create(newGame);

  let updatedGame = {Name: 'UpdatedGame', MinPlayers: 5, MaxPlayers: 20, GameType: "Other"};
  let finalGame = await gamesDAO.update(newGame._id, updatedGame);
  expect(finalGame.Name).toEqual('UpdatedGame');
})

