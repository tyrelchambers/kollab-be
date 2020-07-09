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
    await jwt.verify(req.headers.token, config.development.secret, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        const payload = jwt.verify(req.headers.token, config.development.secret, {ignoreExpiration: true} );
        const token = jwt.sign({uuid: payload.uuid, email: payload.email}, config.development.secret, {
          expiresIn: "1d"
        });

        req.headers.token = token
      }
    });

    next()
}

module.exports = {
  authHandler,
  checkJwt
}