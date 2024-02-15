const express = require("express");
const router = express.Router();
const db = require('../models')
const jwt = require("jsonwebtoken")

router.get("/secrets",(req,res)=>{
    console.log("headers")
    console.log(req.headers)
    const token = req?.headers?.authorization;
    console.log(token)
    console.log('=============================')
    try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded)
    res.send("Welcome to Pictionar-eh!")
    } catch(err){
        res.status(403).json({msg:"invalid token!"})
    }
})

const userRoutes = require("./userRoutes");
router.use("/api/users", userRoutes);

const drawingRoutes = require("./drawingRoutes");
router.use("/api/drawings", drawingRoutes);

const answerRoutes = require("./answerRoutes");
router.use("/api/answers", answerRoutes);

module.exports = router;