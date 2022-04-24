require('dotenv').config(); // get the env variables 
const mongoose = require('mongoose');

exports.connect = function(dbwhere){
  let uri = process.env.DB_URI; // Default place, prod db
  if(dbwhere==='test') // If chosen, set to test db
     uri = process.env.TEST_DB_URI; 

  mongoose.connect(uri,function(err){
        if(err) console.log(err); // Error callback
  });
  console.log('Database connected.');
}

exports.disconnect = async function(){
  await mongoose.connection.close(); 
}
