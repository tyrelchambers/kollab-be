const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const helmet = require('helmet')
const expressSanitizer = require('express-sanitizer')
const auth = require('./api/auth/index')
const user = require('./api/user')
const upload = require('./api/upload/index')
const project = require('./api/projects/index')
const projectLinks = require('./api/projectLinks/index')
const projectRole = require('./api/projectRole/index')
const collaborators = require('./api/collaborators/index')
const comments = require('./api/comment/index')
const github = require('./api/github/index')
const search = require('./api/search/index')

require('./jobs/featureProject')

const { checkJwt } = require('./middleware/middleware')
require('dotenv').config();

const port = process.env.PORT || '4000';

const app = express();

const currentDay = (req, res, next) => {
  let date = new Date(Date.now())
  res.locals.currentDay = date

  next()
}

app.use(cors());

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  extended: true,
}));
app.use(expressSanitizer());

app.use(checkJwt)
app.use(currentDay)

app.use('/api/auth', auth)
app.use('/api/user', user);
app.use('/api/projects', project)
app.use('/api/upload', upload);
app.use('/api/projectLinks', projectLinks)
app.use('/api/projectRoles', projectRole)
app.use('/api/collaborators', collaborators)
app.use('/api/comments', comments);
app.use('/api/callback/github', github)
app.use('/api/search', search)

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send({error: err.message || err})
})

app.listen(port, () => console.log("App running on " + port));