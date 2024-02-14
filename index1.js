
import express from "express";
import fs from "fs"
import path from "path"
import bodyparser from "body-parser"
import mongoose from "mongoose";
var app = express();
const port=3000;

const url = 'mongodb://0.0.0.0:27017/practice';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.once('open', () => {
    console.log("Connected to database");
});

conn.on('error', (error) => {
    console.error('Error:', error.message);
    process.exit();
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("formp.html"));
})
const loginSchema = new mongoose.Schema({
    name: String,
    password: String,
  });
  
const LoginModel = mongoose.model('form', loginSchema);
  
app.post("/check",async(req,res)=>{
    const uname1=req.body['uname'];
    const pass1=req.body['pass'];
    console.log(uname1);
    console.log(pass1);
    try {
        const user = await LoginModel.findOne({ name: uname1, password: pass1 }).exec();
    
        if (user) {
          email1=user.email;
          console.log(email1);
          res.send(`<h1>success</h1>`)
        } else {
          res.sendFile(`<h1>Not success</h1>`);
        }
      } catch (err) {
        console.error("Error querying data:", err.message);
        res.sendFile(__dirname + "/error.html");
      }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  