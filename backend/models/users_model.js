const {default : mongoose} = require('mongoose');

const USERS_SCHEMA = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    quizes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quizzes",
        required:true
    }],

})
const users = mongoose.model('User',USERS_SCHEMA);

module.exports = users;  