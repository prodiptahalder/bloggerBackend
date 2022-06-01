const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createBlog, getABlog, getAllBlogs, verifyABlog, deleteABlog, getRecentBlogs} = require('../Controllers/blog');
const {userAuth} = require('../Auth/userAuth');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = function(req, file, cb){

    // cb(null, false); //to not store file
    // cb(null, true); //to store file
    // cb(false); //to not store and throw error

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(false);
    }
}

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024*1024*100//100MB
    },
    fileFilter: fileFilter
});

//create blog
router.post('/', upload.single('image'), createBlog);

//get all blogs
router.get('/:status', getAllBlogs);

//get a blog
router.get('/:id', getABlog);

//get recent blogs
router.get('/recent/:n', getRecentBlogs);

//verify a blog
router.patch('/:id', userAuth, verifyABlog);

//delete a blog
router.delete('/:id', userAuth, deleteABlog);

module.exports = router;