const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require("../modals/user");
const Referral = require("../modals/referralCode");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyparser = require("body-parser");
const { MongoClient } = require('mongodb');
router.use(bodyparser.urlencoded());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }))
const SECRET="restapi";
const uri="mongodb+srv://chhaviteotia8:mp7sdI6NCtoG5rSu@cluster0.b9klol5.mongodb.net/"

// register a new user
router.post("/register", async (req, res) => {
    try{
      const{name, email, password, refId, refCode}=req.body
      const existingUser =await User.findOne({email})
      console.log(existingUser, "user")
      if(existingUser){
        return res.status(400).json({message:"username already exists"})
      }
     // register a user using referral code
      let referredPerson= ''
      if(refId){
        const code  = await Referral.findOne({ referralId: refId })
      if (code){
        code.referredCount++
        referredPerson=code.userId
        code.save()
      } else {
        return res.status(400).json({message:"refId is not valid"})
      }
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const refdata= uuidv4() // generate random refcode
      const userId= uuidv4() // generate random userId 
      const newUser = new User({name, email, password:hashedPassword, refId, refCode: refdata, userId:userId})
      await newUser.save()
      // saving refcode and userId into referral schema
      const newref= new Referral({referralId: refdata, userId:userId, referredBy:referredPerson})
      await newref.save()
      
      res.status(201).json({message: "user registered successfully"})
    }catch(error){
      console.log(error);
      res.status(500).json({message:'Internal server error'})
    }
  });
  
  // login
  router.post('/login', async(req,res)=>{
   try{
    const {email, password}= req.body
    const user= await User.findOne({email})
    if(!user){
      res.status(401).json({message:"Invalid email or password"})
    }
    const passwordMatch= await bcrypt.compare(password, user.password)
    if(!passwordMatch){
      res.status(402).json({message: "Invaid password"})
    }
    const token = jwt.sign({data:user._id}, SECRET)
    return res.json({
    status:"Login successfull",
    token:token,
    user:user,
  })
  
   }catch(error){
    console.log(error);
    res.status(500).json({message: "Internal server error"})
   }
  })
  // get all users
 router.get('/users', async (req, res) => {
    try {
      const client = await MongoClient.connect(uri);
      const db = client.db();
      const users = await db.collection('users').find().toArray();
      client.close();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  //get user by email
router.get('/user/:email', async (req, res) => {
  console.log(res);
  try {
    const email = req.params.email;

    const user = await User.find({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
})

// get referral table by userId
router.get('/referral/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const referral = await Referral.find({ userId });
    if (!referral) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(referral[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
})

  module.exports =router