require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes/index.js');
const dummyData = require('./dummyData.js');

const app = express();

app.use(bodyParser.json());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

routes(app);

const uristring = process.env.MONGODB_URI || 'mongodb://localhost/imageboard';

mongoose.Promise = global.Promise;
mongoose.connect(uristring, (err) => {
  if (err) {
    console.log(`ERROR connecting to: ${uristring}. ${err}`);
  } else {
    console.log(`Succeeded connecting to: ${uristring}`);
  }
  dummyData();
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Node.js listening on port ${port}...`);
});
