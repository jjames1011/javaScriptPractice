var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require("../middleware");



//GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next){
  User.findById(req.session.userId)
    .exec(function(error, user){
      if(error){
        return next(error);
      } else {
        return res.render('profile', {title: "Profile", name: user.name, favorite: user.favoriteBook});
      }
    })
});

//GET /logout
router.get("/logout", function(req, res, next) {
  if(req.session){
    //delete session object
    req.session.destroy(function(err){
      if(err){
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});
//GET /login
router.get('/login', mid.loggedOut, function(req,res,next) {
  return res.render('login', {title: 'Log in'});
});

router.post('/login', function(req, res, next){
  //get the email/password from the request object
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error("Wrong email or password");
        err.status = 401;
        return next(err);
      } else {
        //if that user's hashed password is equal to the inputted hashed PW
          // create a session object and add it to the db
        req.session.userId = user._id;
        return res.redirect("/profile");
      }
    });
  } else {
    var err = new Error("Email and password are required.");
    err.status = 401;
    next(err)
  }



});

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

router.get('/register', mid.loggedOut, (req, res, next) => {
  // return res.render('', {title: 'Register'})
  return res.render('register', {title: 'Sign Up'});
});

router.post('/register', (req, res,next) => {
  if (req.body.email &&
      req.body.name &&
      req.body.favoriteBook &&
      req.body.password &&
      req.body.confirmPassword) {
        //confirm that user types same password twice
        if (req.body.password !== req.body.confirmPassword){
          var err = new Error("Passwords do not match.")
          err.status = 400;
          return next(err);
        }
        //create object with form input
        var userData = {
          email: req.body.email,
          name: req.body.name,
          favoriteBook: req.body.favoriteBook,
          password: req.body.password
      };

      //use schemas create mothod to insert docyment into mongo
      User.create(userData, function( error, user){
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });

  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
