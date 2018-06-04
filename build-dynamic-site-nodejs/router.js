var Profile = require("./profile.js");



//Handle HTTP route GET / and POST / i.e. Home
function home(request, response){
  response.statusCode = 200;
  //if url === "/" && GET
  if(request.url === '/'){
    //show search
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    response.write('Search\n');
    response.end('Footer\n');
  }
    //response.end('Hello World\n');
  //if url === "/" && POST
    //redirect to /:username
}
//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response){
  //if url === '/...'
  const username = request.url.replace("/","");
  if(username.length > 0){
    response.setHeader('Content-Type', 'text/plain');
    response.write('Header\n');
    //get json from treehouse
    var studentProfile = new Profile(username);

    //on the 'end' event
    studentProfile.on("end", function(profileJSON){
      //store the values which we need
      const values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.javaScript
      }
      //simple response
      response.write(values.username + ' has ' + values.badges + ' badges\n');
      response.end('Footer\n');
    });

    //on "error"
    studentProfile.on("error", function(error){
      response.write(error.message + '\n');
      response.end('Footer\n');
    });

  }
}



module.exports.home = home;
module.exports.user = user;
