var mongoose=require("mongoose");
var Campground=require('./modules/campground');
var Comment=require('./modules/comment');
var data=[
{
  name:"Camping English",
  image:"https://farm9.staticflickr.com/8119/8800093211_2d4e813c60.jpg",
  description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
  name:"Desert camp",
  image:"https://farm8.staticflickr.com/7580/15511321130_e475342bb2.jpg",
  description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
  name:"Forest party",
  image:"https://farm8.staticflickr.com/7095/7397611554_9ca2bd546a.jpg",
  description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
]

function seedDB(){
  //Remove all campgrounds
  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }
    else {
      console.log("removed campgrounds");
      //craete campgrounds
      data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
          if(err){
            console.log(err)
          }
          else{
            console.log("Added campground");
            //crate comment
            Comment.create({
              text:"This place is nice. But I wish there was internet.",
              author:"Ninad"
            },function(err,comment){
              if(err){
                console.log(err);
              }
              else{
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment");
              }
            });
          }
        });
      });
    }
  });
}

module.exports=seedDB;
