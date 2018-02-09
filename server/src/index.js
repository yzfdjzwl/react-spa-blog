const express = require('express');
const app = express();
const post = require('./app/post/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/blog', () => {
  console.log('mongodb connect successful');
});


app.use(bodyParser.json()); // for json parser
app.use(bodyParser.urlencoded({ // for application/x-www-form-urlencoded
  extended: true
}));
app.use(post);

// app.use(express.static(`${__dirname}/../../ui/dist`));
app.use(express.static(`${__dirname}/../public`));

app.listen(3000, () => {
  console.log('listening 3000...');
});
