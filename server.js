const expressApp = require('./app');
const dotenv = require('dotenv');
const DbConnection = require('./DbConnection');

dotenv.config(); // reads file

// listen to client requests in socket
const server = expressApp.app.listen(process.env.Port,process.env.Host, function(){
    console.log(`Server running in ${process.env.Host}:${process.env.Port}`);
    }); 
    
DbConnection.connect();