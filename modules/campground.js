var mongoose=require("mongoose");
var campgroundSchema= new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments:[   //array of comment ids
    {
      type:mongoose.Schema.Types.ObjectId, //comment id
      ref:"Comment" //model name
    }
  ]
});
module.exports=mongoose.model("Campground",campgroundSchema);
