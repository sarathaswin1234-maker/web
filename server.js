import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import saveschema from "./model.js";

const app=express();
app.use(cors());
app.use(express.json())

try{
    await mongoose.connect("mongodb://127.0.0.1:27017/taskmanager");
}
catch(e){
    console.log(e);
}
let tasks=["start","wake up"]
app.get("/get",async(req,res)=>{
    try{

        const alltask=await saveschema.find();
        console.log(alltask.map(e=>e.task))
        res.send(alltask.map(e=>e.task));
    }
    catch(err){
        console.log(err)
    }
})
app.post("/post",async (req,res)=>{
    const task = req.body.task;
    console.log(task);
    try {
        const result = await saveschema.create({ task });
        console.log(result);
        res.send("task posted");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error posting task");
    }
})
app.put("/update/:id",async (req,res)=>{
    const index=req.params.id;
    const updatedTask=req.body.task;

    try{
        const result=await saveschema.updateOne({task:index,task:updatedTask});
        res.send("updated");
    }
    catch(e){
        console.log(e);
    }
})
app.delete("/delete/:id",async(req,res)=>{
    try{
        const index = req.params.id;
        console.log(index)
        const recind=saveschema.findOne({task:index})
        const resu=await saveschema.deleteOne({task:index});
        res.send("task deleted");
    }catch(e){

    }
})
app.listen(8080,()=>{
    console.log("server running on 8080")
})