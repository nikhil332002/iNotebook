const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    obj={
        name:"niki",
        number:33
    }
    res.json(obj)
})

module.exports=router