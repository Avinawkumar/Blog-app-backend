
const jwt=require("jsonwebtoken")
const auth = (req,res,next)=>{
    // when used barer
    // const token=req.headers.authorization.split(" ")[1]
    const token=req.headers.authorization
    if(token){
       const decoded=jwt.verify(token,"masai")
       if(decoded){
        req.body.userID=decoded.userID // putting userID into blog document creting relationship between users and blog collection)

        next()
       } else {
     
       res.status(400).send({msg: "Please Login first"})
       }
    } else {
        res.status(400).send({msg: "Please Login first"})
    }
}

// const updatAuth = (req,res,next)=>{
//     // when used barer
//     // const token=req.headers.authorization.split(" ")[1]
//     const token=req.headers.authorization
//     if(token){
//        const decoded=jwt.verify(token,"masai")
//        if(decoded){
//         console.log(req.body,decoded)
//         if(req.body.userID===decoded._id){
//             next()
//         } else{
//             res.status(400).send({msg: "This in not your blog"})
//         }

        
//        } else {
     
//        res.status(400).send({msg: "Please Login first"})
//        }
//     } else {
//         res.status(400).send({msg: "Please Login first"})
//     }
// }


module.exports={
auth
}