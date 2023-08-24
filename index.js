const express = require("express");
const mongoose= require("mongoose");
var cors = require("cors");
const connectedToAdb = require("./configs/db");
const usersRouter = require("./routes/user.routes");
const { auth } = require("./middleware/auth.middleware");
const blogRouter = require("./routes/blog.routes");




require("dotenv").config(); // important

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/", (req,res) =>{
//     res.send({msg:"welcome to blog app "})
// })

app.use("/api", usersRouter);

app.use(auth);

app.use("/api", blogRouter);













app.listen(process.env.port, async() =>{
    try {
        await connectedToAdb
        console.log("connected to mongoAtlas")
    } catch (error) {
        console.log(" not connected to mongoAtlas")
        console.log(error);
    }
    console.log(`server is running on port ${process.env.port}`)
 })



 module.exports = app;