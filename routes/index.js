var express=require("express");
var router=express.Router();
var User=require("../modules/user");
var passport=require("passport");

router.get("/",function(req,res){
  res.render("landing.ejs");
});



//AuTH routes
router.get("/register",function(req,res){
  res.render("register.ejs");
});

router.post("/register",function(req,res){
  var newUser=new User({username: req.body.username});
  //register this user using passport
  User.register(newUser,req.body.password,function(err,user){
    if(err){
      console.log(err);
      return res.render("register.ejs");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/campgrounds");
    });
  });
});

//login routes
router.get("/login",function(req,res){
  res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}), function(req,res){
  res.send("Login logic happes here");
});

//logout routes
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports=router;
