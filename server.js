const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const helmet = require('helmet')
const expressSanitizer = require('express-sanitizer')
const models = require('./db/Models/index')
const config = require('./config')
const session = require('express-session')
const auth = require('./api/auth/index')
const { uuid } = require('uuidv4')
const user = require('./api/user')
const passport = require('passport')
const m = require('./db/Models/index')
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')
require('dotenv').config();

const port = process.env.PORT || '4000';

const app = express();


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (username, password, done) => {
    const user = await m.User.findOne({ 
      where: {
        email: username
      }
    }).then(user => {
      if (user) {
        return user.dataValues;
      }
    })
    
    if (!user) return done(null, false);

    // const hashPassword = await bcrypt.compareSync(password, user.password);
    // if ( !hashPassword ) throw new Error("Incorrect password");

    if (password !== user.password) return done(null, false)

    return done(null, user)

  }
  
))

passport.serializeUser((user, done) => {
  done(null, user.uuid)
})

const sess = {
  secret: config.development.secret,
  cookie: {
    expires: 86400000
  },
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: config[config.env].database
  }),
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  name: "sid"
};

if (app.get('env') === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  app.set('trust proxy', 1);
}

app.use(session(sess));

app.use(passport.initialize())
app.use(passport.session())

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  extended: true,
}));
app.use(expressSanitizer());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use('/api/auth', auth)
app.use('/api/user', user);

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send({error: err.message || err})
})

app.listen(port, () => console.log("App running on " + port));