var mongoose = require("mongoose");
var Hotel = require("./models/hotel");
var Comment = require("./models/comment");

var data = [
    {
        name:"Four Seasons Resort Bali at Sayan",
        location:"Indonesia",
        image:"https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1494019738%2F29-four-seasons-resort-bali-at-sayan-WBTOPHOTELS0505.jpg%3Fitok%3DRpssIGyM&w=800&q=85",
        description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name:"Four Seasons Hotel Hangzhou at West Lake",
        location:"Hangzhou, China",
        image:"https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1494018877%2F24-four-seasons-hotel-hangzhou-at-west-lake-WBTOPHOTELS0505.jpg%3Fitok%3DvIt0Wl2k&w=800&q=85",
        description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name:"Zarafa Camp",
        location:"Botswana",
        image:"https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1494018877%2F10-zarafa-camp-WBTOPHOTELS0505.jpg%3Fitok%3D7w_eb5Jo&w=800&q=85",
        description:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    }
];

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Hotel.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all campgrounds");
        
        //ADD A FEW CAMPGROUNDS
        data.forEach(function(seed){
            Hotel.create(seed, function(err,hotel){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added hotel");
                    //Create a comment for hotel
                    Comment.create(
                        {
                            text:"This place is great, but pricey",
                            author:"Homer"
                        }, 
                        function(err,comment){
                           if(err){
                               console.log(err);
                           }
                           else{
                               hotel.comments.push(comment);
                               hotel.save();
                               console.log('created new comment');
                           }
                        }
                    )
                }
            });
        });
    });
    
}

module.exports = seedDB;