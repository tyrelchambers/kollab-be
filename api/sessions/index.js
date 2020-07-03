import express from 'express';
import User from '../../db/models/User'

const app = express.Router();

app.post('/new', async ( req, res, next ) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.body.sub
      }
    });
    req.session.user_id = user.uuid;
    res.send({cookie: req.session.id});
  }

  catch(err) {
    next(err)
  }
});

module.exports = app;