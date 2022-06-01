const mongoose = require('mongoose');

const Tag = require('../Models/tag');

// CREATE TAG
const createTag = (req, res) => {
    const tag = new Tag({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    tag.save()
    .then(tag => {
        res.status(200).json({message: 'tag created successfully', tag:tag});
    })
    .catch( err => res.status(500).json({message: "error while creating tag", err: err}));
};

// GET TAGS
const getTags = (req, res) => {
    Tag.find()
    .exec()
    .then(tags => {
        if(tags.length < 0) res.status(404).json({message:"No tags found"});
        res.status(200).json({message:"Tags found", count: tags.length, tags: tags});
    })
    .catch( err => res.status(500).json({message:"Error while getting tags", err:err}));
};

module.exports = {createTag, getTags};