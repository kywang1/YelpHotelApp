var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Hotel = require("./models/hotel"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");
    

mongoose.connect("mongodb://localhost/yelp_hotel_v3");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

seedDB();

app.get("/",function(req,res){
    res.render("landing");   
});

app.get("/hotels",function(req,res){
    //res.render("campgrounds",{campgrounds:campgrounds});
    //Get all hotels from db
    Hotel.find({},function(err,allhotels){
       if(err){
           console.log(err);
       } 
       else{
           res.render("hotels/index",{allhotels:allhotels});
       }
    });
});

app.post("/hotels",function(req,res){
  //get data from form and add to campgrounds array
  //redirect back to get
  var name = req.body.name;
  var location = req.body.location;
  var description = req.body.description;
  var image = req.body.image;
  var newHotel = {name:name,location:location,description:description,image:image};
  
  //Create a new hotel and save to DB
  Hotel.create(newHotel,function(err,newlyCreated){
    if(err){
        console.log(err);  
    } else{
        res.redirect("/hotels");
    }
    });
  });

app.get("/hotels/new",function(req,res){
    res.render("hotels/new");
});

//Shows more info about hotels
app.get("/hotels/:id",function(req, res) {
    console.log(req.params);
    Hotel.findById(req.params.id).populate("comments").exec(function(err,foundHotel){
        if(err){
            console.log(err);
        }else{
            res.render("hotels/show",{hotel:foundHotel});
        }
    });
});


// =================
// COMMENTS ROUTES
//=================

app.get("/hotels/:id/comments/new",function(req, res) {
    //find hotel by id
    
    Hotel.findById(req.params.id,function(err,hotel){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{hotel:hotel});
        }
    })
    
});

app.post("/hotels/:id/comments",function(req,res){
 
    //lookup using id
    //create new comment
    //connect new comment to campground
    //redirect to hotel show page
    Hotel.findById(req.params.id,function(err, hotel){
        if(err){
            console.log(err);
            res.redirect("/hotels");
       }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    hotel.comments.push(comment);
                    hotel.save();

                    res.redirect(`/hotels/`+ hotel._id);
                }
            })
       }
    });
  
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp Server has Started");
});