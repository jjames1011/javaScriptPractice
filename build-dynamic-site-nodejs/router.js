const Profile = require("./profile.js");
const renderer = require('./renderer.js');
const commonHeader = {'Content-Type': 'text/html'}

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response){
  // response.statusCode = 200;
  //if url === "/" && GET
  if(request.url === '/'){
    //show search
    response.writeHead(200, commonHeader);
    renderer.view('header', {} , response);
    renderer.view('search', {}, response);
    renderer.view('footer', {}, response);
    response.end();
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
    response.writeHead(200, commonHeader);
    renderer.view('Header', {}, response);
    //get json from treehouse
    var studentProfile = new Profile(username);

    //on the 'end' event
    studentProfile.on("end", function(profileJSON){
      //store the values which we need
      const values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //simple response
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });

    //on "error"
    studentProfile.on("error", function(error){
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });

  }
}



module.exports.home = home;
module.exports.user = user;
