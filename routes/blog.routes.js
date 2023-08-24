const express=require("express")
const jwt=require("jsonwebtoken");
const blogSModel = require("../models/blog.model");
const userModel = require("../models/user.model");
// const { updatAuth } = require("../middleware/auth.middleware");


const blogRouter = express.Router();

// post route for adding blogs
blogRouter.post("/blogs", async (req,res)=>{
    const payload=req.body
    try {
        const new_flight=new blogSModel(req.body)
        await new_flight.save()
        res.status(201).send({"msg":"blog added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
 });


 // get route for list of all available blogs.
 blogRouter.get("/blogs", async(req,res)=>{

    try {
            const blogs = await blogSModel.find()
            res.status(200).send(blogs);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})



// route for update the details of a specific flight identified by its ID.
blogRouter.put("/blogs/:id", async(req,res)=>{
    const payload=req.body
    const id=req.params.id;
    try {
        await blogSModel.findByIdAndUpdate({_id:id}, payload);
        
        res.status(202).send({"msg":"blogs Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// delete route for delete a specific flight identified by its ID.
blogRouter.delete("/blogs/:id", async(req,res)=>{

    const id=req.params.id
    try {
        await blogSModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":"blogs Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// blogs whose category is tech. (Should work with all the categories, not just tech)
blogRouter.get("/filter", async(req,res)=>{
    const category = req.query.category;

    try {
            const filterData = await blogSModel.find({category});
            res.status(200).send(filterData);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})


// sort  users to sort the blogs based on date.
blogRouter.get("/sort", async(req,res)=>{
    const sortDate = req.query.order === "asc" ? 1 : -1;

    try {
            const sortedData = await blogSModel.find().sort({date: sortDate});
            res.status(200).send(sortedData);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})

// 	
// search for blogs using their title.
blogRouter.get("/search", async(req,res)=>{
    const searchTerm = req.query.title.toLowerCase();
    console.log(searchTerm)

    try {
            const searchResult = await blogSModel.find({
                title: { $regex: searchTerm, $options: "i"}
            });
            res.status(200).send(searchResult);
        
        } catch (error) {
        res.status(400).send({"msg":error.message})
        }
})





module.exports = blogRouter;