const {userSchema , taskSchema}= require('../utils/schemaValidation.js');
const ExpressError = require('../utils/expressError.js');
const jwt = require('jsonwebtoken');

module.exports.Validation = (req,res,next) => {
  let result = userSchema.validate(req.body);
  console.log(result);
  if(result.error) {
    throw new ExpressError(400,result.error.details[0].message);
  }
  else{
    next();
  }
}


module.exports.taskValidation = (req,res,next) => {
  let result = taskSchema.validate(req.body);
  console.log(result);
  if(result.error) {
    throw new ExpressError(400,result.error.details[0].message);
  }
  else{
    next();
  }
}




module.exports.jwtMiddleware = (req,res,next) => {
  const authHeader = req.headers.authorization || " ";
  const [schema , token] = authHeader.split(' ');
  if(schema !== "Bearer" || !token){
    return res.status(401).send("Missing or Invalid Authoriaztion Header");
  }
  try {
    const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
      req.user = {id : decoded.id , email : decoded.email};
      next();
    }
  catch(err) {
    if(err.name === "TokenExpiredError"){
      return res.status(401).send("token has expired");
    }
    console.log(err);
    return res.status(401).send("token is invalid");
  }
  }
  