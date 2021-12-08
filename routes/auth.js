const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../middleware/tokenVerify')


router.post('/register', async (req,res) =>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch(e){
        res.status(500).json(e)
    }
})

router.post("/login", async (req,res) => {
    try {
        const candidate = await User.findOne({"email": req.body.email})
        !candidate && res.status(404).json("user not found")
        const password = await bcrypt.compare(req.body.password, candidate.password)
        !password && res.status(400).json("wrong password")
        const token = await jwt.sign({"user_id": candidate._id, "isAdmin": candidate.isAdmin}, process.env.SECRET, {
            expiresIn: 300
        })
        // res.cookie("token", token, {
        //     expires: new Date(Date.now() + 900000),
        //     httpOnly: true
        // })
        // res.status(200).json({message: "Here's your cookie", user_id: candidate._id, auth: true, token: token})
        res.status(200).json({message: "Login success", user_id: candidate._id, auth: true, token: token})
        
        
        
    } catch (e) {
        res.status(500).json(e)
        
        
    }
    
})


module.exports = router