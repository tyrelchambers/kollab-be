const jwt = require('jsonwebtoken');
const config = require('../config');
const authHandler = async (req, res, next) => {

  try {
    if ( !req.headers.token ) throw new Error("No token provided");

    const token = req.headers.token;
    
    const userId = await jwt.verify(token, config[config.env].secret, (err, decoded) => {
      if ( err ) throw new Error(err);
      if ( decoded._id || decoded.id ) {
        throw new Error("Auth token is old. Please sign in again.")
      }
      return decoded.uuid     
    });

    res.locals.userId = userId;
    next();
  }

  catch(err) {
    next(err)

  }
  
}

const checkJwt = async (req, res, next) => {
  try {
    const verifiedToken = jwt.verify(req.headers.token, config.development.secret, (err, decoded) => {
      if (err) {
        console.log(err)
      }

      console.log(decoded)
    });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authHandler
}