const express = require('express');
//created the express app
const app = express();

//express automatically looks for 'views' folder for templates
//this can be set to changed if needed
app.set('view engine', 'pug');



//get() method is used to handle GET requests on a specified url
app.get('/', (req, res) => {
  //res.render will use pug to render the templates
  //res.render(view, [locals], [callback]) [] indicates optional params
  res.render('index');
});

app.get('/cards', (req, res) => {

  res.render('card', {prompt: 'Who is buried in Grant\'s tomb', hint: 'Think about whos tomb it is'});
});

//creates the server when this file is ran with node
app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
