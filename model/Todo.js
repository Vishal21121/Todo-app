const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    label:{
        type:String,
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }

})

module.exports = mongoose.model('Todo',todoSchema);