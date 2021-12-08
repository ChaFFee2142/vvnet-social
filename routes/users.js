const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const verifyJWT = require('../middleware/tokenVerify')

//get user
router.get('/:id', verifyJWT,async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const {
            password, updatedAt, ...other
        } = user._doc
        res.status(200).json(other)
    } catch (e) {
        return res.status(500).json(e)
    }
})

//update user
router.put('/:id', verifyJWT, async (req,res) => {
    if(req.body.user_id === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.salt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (e) {
                return res.status(500).json(e)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json("User data has been updated")
        } catch (e){
            return res.status(500).json(e)
        }
    } else {
        return res.status(403).json("You can't update anoter person's account")
    }
})

//delete user
router.delete('/:id', verifyJWT,async (req,res) => {
    if(req.body.user_id === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User account has been deleted")
        } catch (e){
            return res.status(500).json(e)
        }
    } else {
        return res.status(403).json("You can't delete anoter person's account")
    }
})


//follow User

router.put('/:id/follow', verifyJWT,async (req,res) => {
    if (req.body.user_id !== req.params.id) {
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.user_id)
            if(!user.followers.includes(req.body.user_id)){
                await user.updateOne({$push: {followers: req.body.user_id}})
                await currentUser.updateOne({$push: {following: req.params.id}})
                res.status(200).json('User has been followed')
            } else {
                res.status(403).json('You already follow this user')
            }
        } catch(e){
            res.status(500).json(e)
        }
    } else{
        res.status(403).json("You can only follow anoter user")
    }
})

//unfollow user
router.put('/:id/unfollow', verifyJWT,async (req,res) => {
    if (req.body.user_id !== req.params.id) {
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.user_id)
            if(user.followers.includes(req.body.user_id)){
                await user.updateOne({$pull: {followers: req.body.user_id}})
                await currentUser.updateOne({$pull: {following: req.params.id}})
                res.status(200).json('User has been unfollowed')
            } else {
                res.status(403).json('You don\'t follow this user')
            }
        } catch(e){
            res.status(500).json(e)
        }
    } else{
        res.status(403).json("You can only unfollow another user")
    }
})

module.exports = router