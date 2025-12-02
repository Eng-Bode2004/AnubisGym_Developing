import express from "express";
const router = express.Router();

import Post_Controller from "../Controllers/Post_Controller";

// Upload Post
router.post('/upload', Post_Controller.uploadPost);

// View All Posts
router.get('/', Post_Controller.getAllPosts);

router.delete('/:id', Post_Controller.deletePost);


export default router;