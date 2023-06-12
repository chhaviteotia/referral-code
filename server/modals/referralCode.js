const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referralSchema = new Schema({
  referralId: {type: String,unique: true},
  userId: {type: String},
  referredCount:{type: Number, default:0},
  referredBy:{type:String},
  createdAt: {type: Date,default: Date.now()}
});

const Referral = mongoose.model('Referral', referralSchema);
module.exports = Referral
