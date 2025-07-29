import { Router } from 'express';
const router = Router();
import {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    getLikes,
    createComment,
    getPostComments,
    replyToComment,
} from '../controllers/blog_controller'

import { withSession } from '../middleware/withSession';

//redirect client (google auth)
router.get("/dashboard", (req, res) => {
    res.redirect("http://localhost:5173");
});

router.get("/adminDashboard", (req, res) => {
    res.redirect("http://localhost:5000");
});

// posts
router.get('/api/posts', withSession, getAllPosts)                    
router.get('/api/posts/:slug', withSession, getSinglePost)            
router.post('/api/posts', withSession, createPost)                    
router.put('/api/posts/:id', withSession, updatePost)
router.delete('/api/posts/:id', withSession, deletePost)              

// likes
router.post('/api/posts/:id/like', withSession, likePost)             
router.delete('/api/posts/:id/like', withSession, unlikePost)
router.get('/api/likes', withSession, getLikes)         

// comments
router.post('/api/posts/:id/comments', withSession, createComment)    
router.get('/api/posts/:id/comments', withSession, getPostComments)   
router.post('/api/posts/:postId/comments/:id/reply', withSession, replyToComment)   


export default router;
