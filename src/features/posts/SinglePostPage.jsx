import React from 'react'
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import PostAuthor from './PostAuthor';
import { useParams } from 'react-router-dom';
import { selectAllPosts } from './postsSlice';
import { useSelector } from 'react-redux';

const SinglePostPage = () => {
    const { postsData, error: postError, status: postStatus } = useSelector(selectAllPosts)
    const { postId } = useParams()
    let [singlePost] = postsData.filter(post=> Number(post.id) === Number(postId))
    console.log("post",singlePost,postId)
    return (
        singlePost ? 
        <article>
            <h3>{singlePost.title}</h3>
            <p>{singlePost.body}</p>
            <p className="postCredit">
                <PostAuthor userId={singlePost.userId} />
                <TimeAgo timestamp={singlePost.date} />
            </p>
            <ReactionButtons post={singlePost}/>
        </article>
        :
        ''    
    )
}

export default SinglePostPage