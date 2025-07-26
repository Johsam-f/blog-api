const createPost = async (req:any, res:any) => {
    const { title } = req.body;
}

async function getAllPosts(){}

async function getSinglePost(){}

async function updatePost(){}

async function deletePost(){}

async function likePost(){}

async function unlikePost(){}

async function getPostLikes(){}

async function createComment(){}

async function getPostComments(){}

async function replyToComment(){}

export {
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
}