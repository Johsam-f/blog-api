import { use } from "react";
import { prisma } from "../lib/prisma";

export async function newPost(title:string, content: string, slug: string, authorId: string) {
    await prisma.post.create({
        data: {
            title,
            content,
            slug,
            authorId
        }
    })
}

export async function AllPosts() {
    return await prisma.post.findMany({
        where: { published: true }
    })
}

export async function singlePost(slug:string) {
    return await prisma.post.findUnique({
        where: {slug}
    })
}

export async function updatedPost(content: string, id: string) {
    return await prisma.post.update({
        where: { id },
        data: { content }
    });
}

export async function _delete(id:string) {
    await prisma.post.delete({
        where: { id }
    })
}

export async function like(postId:string, userId:string ) {
    await prisma.like.create({
        data: {
            postId, userId
        }
    })
}

export async function unlike(postId: string, userId: string) {
    return await prisma.like.delete({
      where: { postId_userId: { postId, userId } } // This uses the composite unique constraint name
    });
}

export async function postLikes(postId:string) {
    return await prisma.like.count({
        where: { postId },
    });  
}

export async function newComment(content:string, postId:string, authorId:string) {
    await prisma.comment.create({
        data: {
            content, postId, authorId
        }
    })
}

export async function allComments(postId:string) {
    return await prisma.comment.findMany({
        where: { postId }
    })
}

export async function newReply(content:string, postId:string, authorId:string, parentId: string) {
    await prisma.comment.create({
        data: {
            content, postId, authorId, parentId
        }
    })
}