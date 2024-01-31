const users = require("../models/users_model");
const bcrypt = require('bcrypt')

const userCheck = async (email) => {
    console.log(email+email+"55555")
    try {
        const Is_User_Exist = await users.findOne({ email });
        if (Is_User_Exist) {
            return Is_User_Exist;
        }
        else{
            throw new Error("User Doesnt Exist")
        }
    }
    catch(error){
        console.log("Error caught in user check , Error Code :" + error.message)
    }

};
const loginCheck = async (email, password) => {
    try {
        const user = await userCheck(email);  //USE THE FN TO CHECK IF THE USER EXIST IN THE DB
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);    //USE BCRYPT TO MATCH THE HASH PASSWORD 
            if (isPasswordCorrect) {         //IF MATCHED THEN 
                return user;      //RETURNED THE DATA OF LOGGED USER 
            } else {
                throw new Error("Password is Incorrect Please Check Again!");
            }
        }
        else {
            throw new Error("User Not Found");
        }
    } catch(error) {
        console.log(error);
    }
};
module.exports = { userCheck, loginCheck };
