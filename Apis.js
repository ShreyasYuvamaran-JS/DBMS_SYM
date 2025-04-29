const express = require("express")
const Apirouter = express.Router()
const {MongoClient,ObjectId} = require("mongodb")

const client = new MongoClient("mongodb://127.0.0.1:27017")
async function ConnectDB(){
try {
   await client.connect()
   console.log("Connected to MongoDb")
   return client.db("TaskManagementSystem")
}
catch(err){
     console.log(err)
}
}
ConnectDB();
let userCollection;
Apirouter.get("/getusers",async(req,res)=>{
     try {
       const db = await ConnectDB()
       const collection = db.collection("Employee_Information")
       const users = await collection.find().toArray()
       res.status(200)
       res.send(users)
     }
     catch(err){
          res.status(500)
          res.send(err)
     }
})
Apirouter.post("/insert_user",async(req,res)=>{
     try {
     const user = req.body
     const db = await ConnectDB()
     const collection = db.collection("Employee_Information")
      const result = collection.insertOne(user)
      res.status(201)
      res.send(result)
}
     catch(err){
          res.status(500)
          res.send(err)
     }
})
Apirouter.get("/tasks",async(req,res)=>{
   try {
      const db = await ConnectDB()
      const usercollection = db.collection("Tasks")
      const tasks = await usercollection.find().toArray()
      res.send(tasks)
   }
   catch(err){
     res.errored(err)
   }
})
Apirouter.use(express.json())
Apirouter.post("/insert_task", async (req, res) => {
     try {
          const task = req.body;
          const id = new ObjectId()
          const db = await ConnectDB();
          const tasks = db.collection("Tasks");
           const result = await tasks.insertOne(task)
           res.status(201)
           res.send(result)
              
        } catch (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: err.message });
        }
 });
Apirouter.delete("/delete_task/:task_title",async (req,res)=>{
     try {
     const db = await ConnectDB();
     const tasks = db.collection("Tasks");
     let task_title = req.params.task_title
     const result = await tasks.deleteOne({task_title:task_title})
     res.send(result)
     }
     catch(err){
          res.send(err)
     }
})
Apirouter.get("/get_messages",async (req,res)=>{
     try {
         const db = await ConnectDB()
         const message_collection = db.collection("messages")
          const messages = await message_collection.find().toArray()
          res.status(200)
          res.send(messages)
     }
     catch(err){
          res.status(500)
          res.errored(err)
     }
})
Apirouter.post("/send_messages",async (req,res)=> {
     try {
           const db = await ConnectDB();
           const message_collection = db.collection("messages")
           const message = req.body;
           const result = message_collection.insertOne(message)
           res.status(200)
           res.send(result)
     }
     catch(err){
          res.status(500)
          res.errored(err)
     }
})

module.exports = Apirouter