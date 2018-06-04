//require filesystem
const fs = require('fs');

function view(templateName, values, response) {
  //Read from the template files
  const fileContents = fs.readFileSync('./views/' + templateName + '.html');
  //#TODO insert values into the content

  //#TODO write out the contents to the response
  response.write(fileContents);


}

//export module
module.exports.view = view;
