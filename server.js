import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import helmet from 'helmet'
import expressSanitizer from 'express-sanitizer'
import models from './db/Models/index'
import config from './config';

require('dotenv').config();
const app = express();
const database = config[config.env].database;

app.use(helmet())

const port = process.env.PORT || '4000';

app.use(bodyParser.urlencoded({ 
  extended: true,
}));
app.use(expressSanitizer());
app.use(cors());

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send(err.message)
})

app.listen(port, () => console.log("App running on " + port));