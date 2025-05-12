import blog from "../models/schema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import post from "../models/post.js";
import { populate } from "dotenv";


const add=async(req,res)=>{
    const user= new blog(req.body);
    let response=await user.save();
    res.json(response);
    console.log(response);
    
}

const register=async(req,res)=>{
    try{
        const existemail=await blog.findOne({email:req.body.email})

        if(existemail){
            return res.status(400).json('mail already exist');
        }

        const hashedpassword=await bcrypt.hash(req.body.password,10);
        console.log(hashedpassword);
        const nwpass={...req.body,password:hashedpassword}

        const nowpass=await new blog(nwpass)
        const savepass=await nowpass.save();
        return res.json(savepass);
        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:'error comesss'})
        
    }

}


const Login=async(req,res)=>{
    try{
        const {email,password}=req.body
        let response=await blog.findOne({email:email})
        if(!response){
            return res.status(404).json("user not valid")
        }
        console.log(response);

        let matchedpassword=await bcrypt.compare(password,response.password)
        console.log(matchedpassword);
        if(!matchedpassword){
            res.status(401).json("invalid password")
        }

        const token=jwt.sign({
            userid:response._id, // what info to include in the token
            email:response.email,
        },
        "abc",
        {expiresIn:"1h"}
    )
        return res.status(200).json({message:"login success",
            token:token,// ✅ TOKEN SENT TO FRONTEND
            _id: response._id,
            name: response.name,
            email: response.email,
          });

        

    }
    catch(error){
        console.log(error);
        res.status(500).json(error.message)
        
    }


}

const profile=async(req,res)=>{
    let id=req.params.id
    let response=await blog.findById(id)
    res.json(response)
    console.log(response);
    

}


const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file?.filename || null;

    const newPost = new post({
      title,
      content,
      userId: req.user.userid,
      image, // ✅ Store image filename here
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error uploading blog", error: err.message });
  }
};





// controller
const getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.userid;
console.log(userId);


    const blogs = await post.find({ userId: userId });

    res.json(blogs);


  } catch (err) {
    console.error("Error getting blogs:", err);
    res.status(500).json({ message: 'Error getting blogs' });
  }
};



const fullview = async (req, res) => {
  try {
    let blogs = await post.find().populate('userId', 'email'); // use a different variable name (not "res")
    res.status(200).json(blogs);
  } catch (error) {
    console.log("Error in fullview:", error.message);
    res.status(500).json({ message: "Server error in fullview" });
  }
};




const deleteBlog = async (req, res) => {
  try {
    const postId = req.params.id;

    // Optional: Only allow author to delete their own post
    const blog = await post.findById(postId);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Optional: check if logged-in user is the author
    if (blog.userId.toString() !== req.user.userid) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
};

const addimage = async (req, res) => {
  try {
    const imagepath = req.file.filename;

    const newitem = new post({
      image: imagepath
    });

    const saveditem = await newitem.save();

    res.json({ success: true, data: saveditem });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blog = await post.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



let updating=async(req,res)=>{
  try{
  let id=req.params.id
  const {title,content}=req.body;
  let updatedfields={title,content};

  if(req.file){
    updatedfields.image=req.file.filename;
  }

  const response= await post.findByIdAndUpdate(id,updatedfields,{new:true});
  res.json(response);
}
catch(error){
  console.log("update error",error.message);
  res.status(500).json({message:"updated failed",error:error.message})
  
}
}


  
  

export {add,register,Login,profile,createBlog,getUserBlogs,deleteBlog,addimage,fullview,updating,getSingleBlog};