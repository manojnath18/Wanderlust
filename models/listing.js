const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); 

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsfGVufDB8fDB8fHww",
        set: (v)=> v=== ""? "https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsfGVufDB8fDB8fHww"
        : v, 
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;