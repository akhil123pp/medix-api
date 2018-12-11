const express=require('express');
const router= express.Router();
const mongoose= require('mongoose');

// importing hospital controller
const HospitalController= require('../controllers/c-hospital');

router.get('/',(req,res, next)=>{
    res.status(200).json({
        message: 'Hospitals are displayed'
    });
});

router.post('/', (req, res, next)=>{
    res.status(201).json({
        message: "Hospital created"
    });
});

// router to handle hospital login
router.post('/login', HospitalController.login_page_post_hospital);

// router to handle hospital register
router.post('/register', HospitalController.register_page_post_hospital);

router.get('/:hospitalId');

router.patch('/:hospitalId', (req, res, next)=>{
    res.status(200).json({
        message: 'Hospital details updated'
    });
});


router.delete('/:hospitalId', (req, res, next)=>{
    res.status(200).json({
        message: 'Hospital details deleted'
    });
});


module.exports= router;
