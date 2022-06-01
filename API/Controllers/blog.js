const mongoose = require('mongoose');

const Blog = require('../Models/blogs');

//GET ALL VERIFIED & UNVERIFIED BLOGS
const getAllBlogs = (req, res) => {
    const status = req.params.status;
    console.log(status);
    Blog.find({verify: (status!=='pending')})
    .select("title body author image tag")
    .populate("tag", "name")
    .exec()
    .then(blogs => {
        if(blogs.length<0)  res.status(404).json({message:"No blogs found"});
        res.status(200).json({message:"Blogs found", count:blogs.length, blogs:blogs});
    })
    .catch(err => res.status(500).json({message:"Error while getting all blogs", err: err}));
};

//GET RECENT BLOGS
const getRecentBlogs = (req, res) => {
    Blog.find({verify: true})
    .sort({createdAt:-1})
    .limit(req.params.n)
    .select("title body author image tag")
    .populate("tag", "name")
    .exec()
    .then(blogs => {
        if(blogs.length<0)  res.status(404).json({message:"No blogs found"});
        res.status(200).json({message:"Blogs found", count:blogs.length, blogs:blogs});
    })
    .catch(err => res.status(500).json({message:"Error while getting all blogs", err: err}));
};


//GET ALL VERFIED BLOGS BY TAG
const getAllBlogsByTag = (req, res) => {
    const tagId = req.params.id;
    Blog.find({tag: tagId, verify: true})
    .select("title body author image tag")
    .populate("tag", "name")
    .exec()
    .then(blogs => {
        if(blogs.length<0)  res.status(404).json({message:"No blogs found"});
        res.status(200).json({message:"Blogs found", count:blogs.length, blogs:blogs});
    })
    .catch(err => res.status(500).json({message:"Error while getting all blogs", err: err}));
};

//GET N VERFIED BLOGS BY TAG
const getNBlogsByTag = (req, res) => {
    const tagId = req.params.id;
    const n = req.params.n;
    Blog.find({tag: tagId, verify: true})
    .sort({createdAt:-1})
    .limit(n)
    .select("title body author image tag")
    .populate("tag", "name")
    .exec()
    .then(blogs => {
        if(blogs.length<0)  res.status(404).json({message:"No blogs found"});
        res.status(200).json({message:"Blogs found", count:blogs.length, blogs:blogs});
    })
    .catch(err => res.status(500).json({message:"Error while getting all blogs", err: err}));
};

// GET A BLOG
const getABlog = (req, res) => {
    const id = req.params.id;
    Blog.find({_id:id, verify: true})
    .select("title body author image tag")
    .populate("tag", "name")
    .exec()
    .then(blogs => {
        if(blogs.length<0)  res.status(404).json({message:"No blog found"});
        res.status(200).json({message:"Blogs found", blog:blogs[0]});
    })
    .catch(err => res.status(500).json({message:"Error while getting all blogs", err: err}));
};

// VERIFY A BLOG
const verifyABlog = (req, res) => {
    const id = req.params.id;
    Blog.updateOne({_id:id}, {$set: {verify: true}})
    .exec()
    .then(blog => {
        if(!blog)  res.status(404).json({message:"No blog found"});
        res.status(200).json({message:"Blog verified", blog:blog});
    })
    .catch(err => res.status(500).json({message:"Error while verifying blog", err: err}));
};

//CREATE A BLOG
const createBlog = (req, res) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        author:req.body.author,
        image: req.file.path,
        tag:req.body.tag,
    });
    blog.save()
    .then(blog=>{
        res.status(200).json(blog);
    })
    .catch(err => {
        res.status(500).json({message:"Failed to create blog", err:err});
    });
};

// DELETE A BLOG
const deleteABlog = (req, res) => {
    const id = req.params.id;
    Blog.deleteOne({_id:id})
    .exec()
    .then(blog => {
        if(!blog)  res.status(404).json({message:"No blog found"});
        res.status(200).json({message:"Blog deleted", blog:blog});
    })
    .catch(err => res.status(500).json({message:"Error while deleting blog", err: err}));
};

module.exports = {createBlog, getAllBlogs, getAllBlogsByTag, getABlog, verifyABlog, deleteABlog, getRecentBlogs, getNBlogsByTag};