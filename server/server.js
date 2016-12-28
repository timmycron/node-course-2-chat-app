const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public');

console.log(publicPath);

const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Server is up on ${port}`);
});
