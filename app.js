const express = require('express'); 
const morgan = require('morgan'); 
const gameController = require('./controller/gameController');

const app = express(); // creates new express app
app.use(morgan('dev')); 

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// server uses folder 'public_html'
app.use(express.static('public_html'));

// handle get request
app.get('/games', gameController.get);

app.post('/submitnewgame', gameController.create);

app.post('/updategame', gameController.update);

app.get('/deletegame/:id', gameController.del);

exports.app = app;
   
