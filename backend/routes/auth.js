const { Router } = require("express");
const auth = Router(); // Using Router() from express
const users = require("../models/users_model");
const {userCheck, loginCheck} = require("../data_services/userCheck");
const bcrypt = require('bcrypt')

auth.get("/", async (req, res) => {
  try {
    const data = await users.find({});
    res.status(200).json({
      message: "Successfully fetched the data!!",
      UserData: data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error in fetching the data ::" + error,
    });
  }
});
//REGISTER THE DATA OF THE USER
auth.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password , 10) //HASHED PASSWORD 

  if (!name ||  !email || !password ) {
    return res.status(400).json({ 
        Message: 'Please fill out the form correctly. All fields are required.',
    });
}
  try {
    const check_user = await userCheck(email);
    if (check_user) {
      return res.status(400).json({ messasge: "User Already Exist!" });
    } else {
      await users.create({ name, email, password:hashedPassword });
      res.status(200).json({ messasge: "User Created Succssfully!" });
    }
  } catch (error) {
    console.error("Error occurred: ", error.message);
    return res.status(500).json({message : "Failed to create user !"})
  }
});
//LOGIN THE USER ==================================================================>>>>
auth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email+email+"777")
  try {
    const check_user_login = await loginCheck(email,password);     //CHECKING IF USER EXIST OR NOT
    if (check_user_login) {
      return res.status(200).json({ messasge: "User Logged In Successful!" });
    } else {
      res.status(400).json({ messasge: "Logged In failed!" });
    }
  } catch (error) {
    console.error("Error occurred: ", error);
    return res.status(500).json({message : "Failed to Login !"})
  }
});

module.exports = auth;
/* export default auth; 
The error you're encountering indicates that your environment may not fully support ECMAScript modules (ESM) */
