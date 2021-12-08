const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 300
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
},
    { timestamps: true }

)


module.exports = mongoose.model("Post", PostSchema)