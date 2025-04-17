import express from 'express'
import dotenv from 'dotenv'
import { connectdb } from './utils/db.js';
import blogRoute from './routes/blogroute.js';
import cors from 'cors'


dotenv.config();
const app=express();
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));



connectdb().then(()=>{
    app.listen(8000,()=>{
        console.log("server is running");
        
    })

})

app.use('/blog',blogRoute)


export default app;