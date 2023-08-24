const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema({
    userID: String,
    username: String,
    title: String,
    content: String,
	category : String,
	date : Date,
	likes :  Number,
	comments : [{username : String, content : String }]
})

const blogSModel = mongoose.model("blog", blogsSchema)


module.exports= blogSModel