import { type Request, type Response } from 'express';
import { slugify } from '../lib/slugify';
import { 
    newPost, AllPosts, singlePost, updatedPost, _delete, 
    like, unlike, getLikesForUser, newComment, allComments, newReply
} from '../models/blog_model';

interface AuthenticatedRequest extends Request {
    user?: {
      id: string;
      email?: string;
      name?: string;
    };
}
  

async function createPost(req:AuthenticatedRequest, res:Response) {
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const slug = slugify(title);

    try {
        const post = await newPost(title, content, slug, req.user.id)
        return res.status(201).json(post)
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

async function getAllPosts(req:AuthenticatedRequest, res:Response){
    try {
        const posts = await AllPosts();
        return res.status(200).json(posts)
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function getSinglePost(req:AuthenticatedRequest, res:Response){
    try {
        const post = await singlePost(req.params.slug as string);
        return res.status(200).json(post)
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function updatePost(req:AuthenticatedRequest, res:Response){
    const { content } = req.body;
    const { id } = req.params;

    if (!content) {
        return res.status(400).json({ error: 'content is required' });
    }
    try {
        const post = await updatedPost(content, id as string);
        return res.status(201).json(post)
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function deletePost(req:AuthenticatedRequest, res:Response){
    const { id } = req.params;
    try {
        await _delete(id as string);
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function likePost(req:AuthenticatedRequest, res:Response){
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const { id } = req.params;
    try {
        await like(id as string, req.user?.id);
        return res.status(200).json({ message: 'Post liked' });
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function unlikePost(req:AuthenticatedRequest, res:Response){
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const { id } = req.params;
    try {
        await unlike(id as string, req.user?.id);
        return res.status(200).json({ message: 'Post unliked' });
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function getLikes(req:AuthenticatedRequest, res:Response){
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    try {
        const likes = await getLikesForUser(req.user?.id);
        return res.status(200).json(likes);
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function createComment(req:AuthenticatedRequest, res:Response){
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Reply content is required' });
    }    
    const { id } = req.params;
    try {
        const comment = await newComment(content, id as string, req.user?.id)
        return res.status(201).json(comment)
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function getPostComments(req:AuthenticatedRequest, res:Response){
    const { id } = req.params;
    try {
        const postComments = await allComments(id as string);
        return res.json(postComments)
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

async function replyToComment(req:AuthenticatedRequest, res:Response){
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    const { postId, id } = req.params;
    const { content } = req.body;
    try {
        const replyComment = await newReply(content, postId as string ,req.user.id, id as string);
        return res.status(200);
    } catch (error) {
        console.error('error getting posts:', error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

export {
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
}