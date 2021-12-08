const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const verifyJWT = require('../middleware/tokenVerify')

//create
router.post('/', verifyJWT,async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (e) {
        res.status(500).json(e)
    }
})


//update
router.put('/:id', verifyJWT,async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) res.status(404).json("Post not found")
        const postOwnerId = post.user_id
        console.log(postOwnerId)
        if (req.body.user_id === postOwnerId || req.body.isAdmin) {
            post.updateOne({ $set: req.body })
            res.status(200).json("Post has been updated")
        } else {
            res.status(403).json("You can only update your post")
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

//delete
router.put('/:id', verifyJWT,async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) res.status(404).json("Post not found")
        const postOwnerId = post.user_id
        console.log(postOwnerId)
        if (req.body.user_id === postOwnerId || req.body.isAdmin) {
            post.deleteOne({ $set: req.body })
            res.status(200).json("Post has been deleted")
        } else {
            res.status(403).json("You can only delete your post")
        }
    } catch (e) {
        res.status(500).json(e)
    }
})



//like
router.put('/:id/like', verifyJWT,async (req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.user_id)){
            await post.updateOne({$push: {likes:req.body.user_id}})
            res.status(200).json("Post has been liked")
        } else{
            await post.updateOne({$pull: {likes:req.body.user_id}})
            res.status(200).json("Post has been disliked")
        }
    }catch(e){
        res.status(500).json(e)
    }
})

//get post
router.get('/:id', verifyJWT,async (req,res) => {
    try{
        const post = await Post.finById(req.params.id)
        res.status(200).json(post)
    } catch(e){
        res.status(500).json(e)
    }
})

//get timeline
router.get('/feed/all', verifyJWT,async (req,res) => {
    try{
        const currentUser = await User.findById(req.body.user_id)
        console.log(currentUser)
        const userPosts = await Post.find({user_id: currentUser._id})
        const followingPosts = await Promise.all(
            currentUser.following.map((followingId) => {
                return Post.find({user_id: followingId })
            })
        )
        res.json(userPosts.concat(...followingPosts))
    } catch(e){
        
        res.status(500).json(e)
    }
})

module.exports = router