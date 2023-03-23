import React from 'react'
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import PostAuthor from './PostAuthor';
import { useParams } from 'react-router-dom';

const SinglePostPage = ({ post }) => {
    const { postId } = useParams()
    
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage