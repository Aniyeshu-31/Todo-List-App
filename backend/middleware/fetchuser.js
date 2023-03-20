const jwt=require('jsonwebtoken');
const JWT_AUTH="ImportantInfo";

fetchuser=(req,res,next)=>{
  const token=req.header('auth-token');
   
  if(!token){
     res.status(401).send({error:"Please login with correct details"});
  }
  try{
      const data=jwt.verify(token,JWT_AUTH);
      req.user = data.user;
      next();
  } 
  catch(error){
    res.status(401).send({error:"Please login with correct details"});
  }
    
}




module.exports=fetchuser;