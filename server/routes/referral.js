const mongoose = require('mongoose');
const express = require('express');
const Referral = require("../modals/referralCode");
const router = express.Router();
const shortid = require('shortid');
const uri="mongodb+srv://chhaviteotia8:mp7sdI6NCtoG5rSu@cluster0.b9klol5.mongodb.net/"
const { MongoClient } = require('mongodb');

// router.get('/referrals', async (req, res) => {
//   try {
//     const client = await MongoClient.connect(uri);
//     const db = client.db();
//     const referrals = await db.collection('referrals').find().toArray();
//     client.close();
//     res.json(referrals);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

async function getAllReferrals () {
  try{
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const referrals = await db.collection('referrals').find().toArray();
    return referrals
  }catch (error){

    console.error('Error retrieving referrals:', error);
  // } finally {
  //   await mongoose.disconnect()

  // }
};
}

  // module.exports= router
  module.exports= getAllReferrals