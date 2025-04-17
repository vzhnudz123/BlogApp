import multer from "multer";

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'uploads/')
    },
    filename:function (req,file,cb){
        const uniquesuffix=Date.now();
        cb(null,uniquesuffix + file.originalname)
    } 
});


export const upload=multer({storage:storage})