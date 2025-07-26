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
router.get('/api/posts', getAllPosts)                    // GET all published posts
router.get('/api/posts/:slug', getSinglePost)            // GET one post by slug
router.post('/api/posts', createPost)                    // CREATE a new post
router.put('/api/posts/:id', updatePost)                 // UPDATE post by ID
router.delete('/api/posts/:id', deletePost)              // DELETE post by ID

// likes
router.post('/api/posts/:id/like', likePost)             // LIKE a post
router.delete('/api/posts/:id/like', unlikePost)         // UNLIKE a post
router.get('/api/posts/:id/likes', getPostLikes)         // GET all likes for a post

// comments
router.post('/api/posts/:id/comments', createComment)    // CREATE top-level comment
router.get('/api/posts/:id/comments', getPostComments)   // GET all comments for a post
router.post('/api/comments/:id/reply', replyToComment)   // REPLY to a comment


export default router;
