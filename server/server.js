const express = require('express');
const mongoose = require('mongoose');

const app = express();

const uristring = process.env.MONGODB_URI || 'mongodb://localhost/imageboard';

mongoose.connect(uristring, (err) => {
  if (err) {
    console.log(`ERROR connecting to: ${uristring}. ${err}`);
  } else {
    console.log(`Succeeded connecting to: ${uristring}`);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Node.js listening on port ${port}...`);
});
