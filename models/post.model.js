const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    message:{
        type: 'string',
        required: true
    },
    author:{
        type: 'string',
        required: true
    },
    user_id:{
        type: 'string',
        required: true
    },
    likers:{
        type:[String]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('post',postSchema)