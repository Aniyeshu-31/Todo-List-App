const express = require("express");
const bcrypt=require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt=require('jsonwebtoken');
const User = require("../models/User");
const JWT_AUTH="ImportantInfo";
const fetchuser = require('../middleware/fetchuser');
// ROUTE 1:  Create a User using post: "/api/auth"
// using async await syntax
router.post(
  "/signup",
  [
    body("name","Enter a valid name").isLength({ min: 3 }),
    body("email","Enter a correct Email").isEmail(),
    body("password","Password must be of minimum 5 length").isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    let success=false;
    const email=req.body.email;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({success,errors:errors.array()});
    } 
    try{
      
      let user = await User.findOne({email:email});
      if(user){
        res.json({"user":"present"});
      }
      else{ 
         const salt = await bcrypt.genSalt(10); // also returns a promise
         const secpass = await bcrypt.hash(req.body.password,salt); // returns a promise
        user = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: secpass,
      });  
      const data={
        user:{
          id:user._id
        }
      }
      const authToken = jwt.sign(data,JWT_AUTH);
      success=true;
      res.json({success,authToken});
    }
    }
    catch(err){
      console.log(err); // catch errors    
      res.status(500).send("Internal Server Error");
    }
    
          //     }).then(user => {
          //       user.save().then(res=>{
          //           console.log("user saved in database!");
          //         })
          //       res.json(user);
          //     }).catch(err=>{
          //       console.log(err);
          //     })
          //     // res.json({"success":"true"});
          //   }
          // });
    });


// ROUTE 2: Authenticate a User   ENDPOINT

router.post(
  "/login",
  [
    body("email","Enter a correct Email").isEmail(),
    body("password","password cannot be blank").exists(),
  ],async (req,res,next)=>{
    let success=false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({erros:errors.array()});
    } 

    const {email,password}=req.body;
    try{
       let user= await User.findOne({email:email});
       if(!user){
        return res.status(404).json({err:"Please try to login with correct details"})
       }
      const passcompare = await bcrypt.compare(password,user.password);
      if(!passcompare){
        success=false;
        return res.status(404).json({success,err:"Please enter correct details"})
      }
      const payloadData = {
        user:{
          id:user._id 
        }
      }
      const authToken = jwt.sign(payloadData,JWT_AUTH);
      success=true;
      // console.log(authToken);
      res.json({success,authToken});
    }catch(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  })
  

// ROUTE 3: get logged In user details
router.post("/getuser",fetchuser,async (req,res,next)=>{
         try
         {
               const userId = req.user.id;
               const user = await User.findById(userId).select("-password");
               res.send(user);
         }catch(error){
              res.status(500).send("Internal Server Error");
         }
  })
    module.exports = router;
