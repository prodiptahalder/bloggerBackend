const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    _id:new mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    tag:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tag',
        required: true
    },
    verify:{
        type: Boolean,
        default: false
    }
},
{ timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);