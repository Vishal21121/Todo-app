const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/todo';
const connnectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose successfully");
    })
}

module.exports = connnectToMongo;