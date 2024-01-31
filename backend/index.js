const  express = require('express');
const { default: mongoose } = require('mongoose');
const env = require('dotenv');
const auth = require('./routes/auth');
const quizNQues = require('./routes/quiz');
const bodyparser = require('body-parser'); //required to work with post to parse the object into a valid response
const cors = require('cors');
//Functions init
const app = express();
env.config({path:'./private.env'})
//ENVIRONMENTAL VARIABLES
const PORT = process.env.PORT || '3001';
const BASEURL = process.env.BASEURL || '192.168.1.69'; 
const DB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.DBNAME;
//Mini Router
app.use(express.json())//auth.use(express.json()); is added to ensure that the JSON request body is properly parsed.
app.use(bodyparser.urlencoded({extended:false}));
//Handler
app.use(cors());
app.use('/auth' , auth)
app.use('/quiz' , quizNQues)

 app.listen(PORT , BASEURL, async (req,res)=>{
    await mongoose.connect(DB_URL,{
        dbName:DB_NAME
    })
    .then(()=>{console.log("Connection to the Database successfull")})
    .catch((error)=>{console.log("Connection to the Database Failed")})
    
    console.log("The server is working fine at port " + BASEURL+":"+PORT)
})
