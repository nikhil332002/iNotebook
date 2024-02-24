const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');

const JWT_SECRET='nikhil';

// endpont:1 create a user using: post"/api/auth/createuser". no login
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:3})
],async (req,res)=>{
  let success=false;
  //finds the error in input data 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ success,errors: errors.array() });
  }

  try{
    //returns error if the email already exists
    let user = await User.findOne({email:req.body.email});
    if (user){
      return res.status(400).json({success,error:"user already exist"})

    }
    const salt= await bcrypt.genSalt(10);
    seqPass= await bcrypt.hash(req.body.password, salt);
    user= await User.create({
        name:req.body.name,
        password:seqPass,
        email:req.body.email,
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken})
  }
  catch (error){
    console.error(error.message);
    res.status(500).send("error occured");
  }
})

//endpoint:2 authenticate a user using: post"/api/auth/login". no login
router.post('/login',[
  body('email').isEmail(),
  body('password').exists(),
],async (req,res)=>{
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() });
  }

  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      
      return res.status(400).json({success,error:"please enter correct credentials"});
    }
    const passwordcompare= await bcrypt.compare(password,user.password);
    if(!passwordcompare){
      success=false;
      return res.status(400).json({success,error:"please enter correct credentials"});
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken})
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("error occured");
  }
})
module.exports=router