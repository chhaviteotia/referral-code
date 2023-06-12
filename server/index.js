const express= require('express');
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 5000
const loginRoutes = require("./routes/user");
const referralCode = require("./routes/referral");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const DB = "mongodb+srv://chhaviteotia8:mp7sdI6NCtoG5rSu@cluster0.b9klol5.mongodb.net/"
mongoose.connect(DB, {
  useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
  console.log("Database connected");
}).catch((error)=>console.log("Database connection error", error))

app.get("/", function (req, res) {
  res.render("home");
});



app.use("/api", loginRoutes);
app.use('/api', referralCode)

app.listen(port, ()=> {
  console.log(`server is running on ${port}`)
})