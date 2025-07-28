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
    getPostLikes,
    createComment,
    getPostComments,
    replyToComment,
} from '../controllers/blog_controller'

import { withSession } from '../middleware/withSession';

//redirect client (google auth)
router.get("/dashboard", (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
});

router.get("/adminDashboard", (req, res) => {
    res.redirect("http://localhost:5000/dashboard");
});

// posts
router.get('/api/posts', getAllPosts)                    
router.get('/api/posts/:slug', getSinglePost)            
router.post('/api/posts', withSession, createPost)                    
router.put('/api/posts/:id', withSession, updatePost)
router.delete('/api/posts/:id', withSession, deletePost)              

// likes
router.post('/api/posts/:id/like', withSession, likePost)             
router.delete('/api/posts/:id/like', withSession, unlikePost)
router.get('/api/posts/:id/likes', getPostLikes)         

// comments
router.post('/api/posts/:id/comments', withSession, createComment)    
router.get('/api/posts/:id/comments', getPostComments)   
router.post('/api/posts/:postId/comments/:id/reply', withSession, replyToComment)   


export default router;
