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

//redirect client (google auth)
router.get("/dashboard", (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
});

// posts
router.get('/api/posts', getAllPosts)                    
router.get('/api/posts/:slug', getSinglePost)            
router.post('/api/posts', createPost)                    
router.put('/api/posts/:id', updatePost)
router.delete('/api/posts/:id', deletePost)              

// likes
router.post('/api/posts/:id/like', likePost)             
router.delete('/api/posts/:id/like', unlikePost)
router.get('/api/posts/:id/likes', getPostLikes)         

// comments
router.post('/api/posts/:id/comments', createComment)    
router.get('/api/posts/:id/comments', getPostComments)   
router.post('/api/posts/:postId/comments/:id/reply', replyToComment)   


export default router;
