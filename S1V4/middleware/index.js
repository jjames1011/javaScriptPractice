function loggedOut(req, res, next) {
  if(req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}
function requiresLogin(req, res, next){
  if(req.session && req.session.userId){
    return next()
  }
  var err = new Error("This route requires login");
  err.status = 401;
  next(err);
  
}

module.exports.requiresLogin = requiresLogin;
module.exports.loggedOut = loggedOut;
