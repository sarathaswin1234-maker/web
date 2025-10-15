import mongoose, { mongo } from "mongoose";

const schema=new mongoose.Schema({
    task:{type:String,required:true}
})

const saveschema=mongoose.model('task',schema)

export default saveschema;