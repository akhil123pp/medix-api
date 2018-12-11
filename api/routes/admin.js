const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const Admin= require('../models/md-admin');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const AdminDetails= require('../models/md-admin');
router.get('/',(req, res, next)=>{
   res.status(200).json({
    message:"handeling the /get request for the patient"
   });
});

router.post('/create', (req, res, next)=>{
    console.log(req.body.username);
    Admin.find({username : req.body.username})
        .exec()
        .then(admin=>{
            if(admin >= 1 ){
                res.status(409).json({
                    message:"Username already exists"
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err,hash)=>{
                    if(err){
                        res.status(500).json({
                            error: err
                        });
                    }else{
                     const admin= new Admin({
                        _id:mongoose.Types.ObjectId(),
                        username:req.body.username,
                        password:hash,
                        role: "admin"
                     });
                     admin
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message: "handling post request to /appointement",
                           createdAdmin:admin 
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                    }
                });
            }
        });    
    });

router.post('/',(req,res, next)=>{
    Admin.find({username: req.body.username})
        .exec()
        .then(admin=>{
            if(admin.length < 1){
                res.status(401).json({
                    message:"Username not found"
                });
            }
            bcrypt.compare(req.body.password, admin[0].password, (err, result)=>{
                if(err){
                    res.status(401).json({
                        message:"Auth Failed"
                    });
                }
                if(result){
                    const token=jwt.sign({
                        username:admin[0].username,
                        userId: admin[0]._id
                    },
                    "secret",
                    {
                        expiresIn:"1h"
                    } 
                    );
                    return res.status(200).json({
                        message:" Auth success",
                        token: token
                    });
                }
            });
            
        })
        .catch();
});
module.exports= router;