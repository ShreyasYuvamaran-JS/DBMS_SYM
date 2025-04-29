const express = require("express");
const path = require("path")
const Router = express.Router()
Router.get("/",(req,res) => {
      res.sendFile(path.join(__dirname,"public","Signin.html"))     
})
Router.get("/signup",(req,res)=> {
     res.sendFile(path.join(__dirname,"public","Signup.html"))
})
Router.get("/home",(req,res)=> {
     res.sendFile(path.join(__dirname,"public","Home.html"))
})
Router.get("/home/sendmessage",(req,res)=>{
     res.sendFile(path.join(__dirname,"public","message_comp.html"))
})
Router.get("home/createtask",(req,res)=>{
     res.sendFile(path.join(__dirname,"public","taskcomp.html"))
})
module.exports=Router