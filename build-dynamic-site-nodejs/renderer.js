//require filesystem
const fs = require('fs');

function mergeValues(values, content) {
  //#TODO insert values into the content
  //cycle over the keys
  for(let key in values) {
    //replace all {{key}} with the values from the values object
    content = content.replace('{{' + key + '}}', values[key]);
  }
  //return merged content
  return content;

};


function view(templateName, values, response) {
  //Read from the template files
  let fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});
  fileContents = mergeValues(values, fileContents);
  response.write(fileContents);
}

//export module
module.exports.view = view;
