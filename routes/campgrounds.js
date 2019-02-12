var express=require("express");
var router=express.Router();
var Campground=require("../modules/campground");
var Comment=require("../modules/comment");



router.get("/campgrounds",function(req,res){
  Campground.find({},function(err,allCampgrounds){
    if(err){
      cosole.log(err);
    } else{
      res.render("campgrounds/campgrounds.ejs",{campgrounds:allCampgrounds});
    }
  });
  // res.render("campgrounds.ejs",{campgrounds:campgrounds});
});

router.post("/campgrounds",function(req,res){
  var Name=req.body.name;
  var Image=req.body.image;
  var Description=req.body.description;
  var newCampground={name:Name,image:Image,description:Description};
  // campgrounds.push(newCampground);
  Campground.create(newCampground,function(err,campground){
    if(err){
      console.log(err);
    } else{
      console.log("new campground added");
    }
  })
  res.redirect("/campgrounds");
});

router.get("/campgrounds/new", isLoggedIn, function(req,res){
  res.render("campgrounds/new.ejs");
});

router.get("/campgrounds/:id",function(req,res){
  var id=req.params.id;
  //find campgrounds by
  Campground.findById(id).populate("comments").exec(function(err,foundCampground){
    if(err)
    {
      console.log(err);
    } else{
      console.log(foundCampground);
      res.render("campgrounds/show.ejs",{campground:foundCampground});
    }
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports=router;
