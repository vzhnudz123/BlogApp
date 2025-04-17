import mongoose from "mongoose";

const postSchema=new mongoose.Schema({

    title:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog',
    }
})

export default mongoose.model('post',postSchema)