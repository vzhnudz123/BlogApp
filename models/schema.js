import mongoose from "mongoose";

let blogschema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true
    }
    

})

const blog=mongoose.model("blog",blogschema);
export default blog;