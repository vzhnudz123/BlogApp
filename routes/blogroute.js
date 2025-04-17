import express from 'express'
import { add, addimage, createBlog, deleteBlog, fullview, getSingleBlog, getUserBlogs, Login, profile, register, updating } from '../controller/blogcontroler.js';
import { verifytoken } from '../middleware/Auth.js';
import { upload } from '../multer.js';




const blogRoute=express.Router();

blogRoute.post('/upload',add)
blogRoute.post('/securedupload',register)
blogRoute.post('/securedLogin',Login)
blogRoute.get('/blogview',profile)
// blogRoute.post('/uploadblog',verifytoken,createBlog)
blogRoute.get('/allblogs',verifytoken,getUserBlogs)
blogRoute.delete('/deleteblog/:id',verifytoken,deleteBlog)
blogRoute.post('/addimage',upload.single('image'),addimage)
blogRoute.get('/fullviews',fullview)


blogRoute.put('/blogedit/:id', upload.single('image'), updating);

blogRoute.get("/allblogs/:id", verifytoken, getSingleBlog);


blogRoute.post('/uploadblog', verifytoken, upload.single('image'), createBlog);













export default blogRoute;