var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./modules/campground");
var Comment=require("./modules/comment");
var seedDB=require("./seeds");
var passport=require("passport");
var localStrategy=require("passport-local");
var User=require("./modules/user");

var commentsRoutes=require("./routes/comments");
var campgroundsRoutes=require("./routes/campgrounds");
var authRoutes=require("./routes/index");


// mongoose.connect("mongodb://localhost/yelp_camp_v6", { useNewUrlParser: true });
// mongodb://<dbuser>:<dbpassword>@ds213665.mlab.com:13665/yelpcamp
mongoose.connect("mongodb://ninad:1yelpcamp@ds213665.mlab.com:13665/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
// seedDB();

//passport setup/configuration
app.use(require("express-session")({
  secret: "I'm building YelpCamp",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//for hiding options when user has logged in or logged Out
app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  next();
});

app.use(commentsRoutes);
app.use(campgroundsRoutes);
app.use(authRoutes);





app.listen(process.env.PORT || 3000,function(){
  console.log("App running");
});
