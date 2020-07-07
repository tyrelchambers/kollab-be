const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const helmet = require('helmet')
const expressSanitizer = require('express-sanitizer')
const auth = require('./api/auth/index')
const user = require('./api/user')
const project = require('./api/projects/index')
const { checkJwt } = require('./middleware/middleware')
require('dotenv').config();

const port = process.env.PORT || '4000';

const app = express();

app.use(cors());

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  extended: true,
}));
app.use(expressSanitizer());

app.use(checkJwt)

app.use('/api/auth', auth)
app.use('/api/user', user);
app.use('/api/projects', project)

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send({error: err.message || err})
})

app.listen(port, () => console.log("App running on " + port));