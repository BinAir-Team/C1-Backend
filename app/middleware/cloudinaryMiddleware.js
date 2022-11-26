const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = (req,res,next)=>{
    const uniqueName = new Date().toISOString();

    if(req.file != null){
        console.log(req.file)
        cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type:'image',
                folder:'binair',
                public_id: `payment-${uniqueName}`,
                tags: `payment`,
            },
            (err,image)=>{
                if(err) return res.status(500).send({
                    msg: "gettin link image error",
                    status: 500,
                    err
                });
                console.log("File uploaded to cloudinary")
    
                fs.unlinkSync(req.file.path);
                req.image_payment = image;
                next();
            }
        )
    }else{
        next()
    }
}
module.exports = uploadCloudinary;