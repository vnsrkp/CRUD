const express = require("express")
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const user = require("./models/UserModel")

mongoose.connect('mongodb+srv://vnsrkp:Jindal@crud.f7s23fs.mongodb.net/?retryWrites=true&w=majority&appName=CRUD')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    res.send("helloo")
})

app.post('/create',async(req,res)=>{
    const newUser = new user(req.body)
    const response = await newUser.save();
    res.send(response)
})

app.get("/read",async(req,res)=>{
    const response = await user.find();
    res.send(response)
})

app.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    // const response = await user.deleteOne({_id:id})
    res.send(response)
})

app.post('/update',async(req,res)=>{
  const data = req.body;
  const response = "UPDATE RAM SET NAME=req.body.name PASSWORD=req.body.password WHERE ID=req.body.id"

})
app.listen(5000);