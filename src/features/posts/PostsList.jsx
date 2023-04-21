import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import SinglePost from './SinglePost';


const PostsList = () => {
    const { postsData, error: postError, status: postStatus } = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const stopRender = useRef(true) // useRef has two rules: changing useRef does not re-renders component and Re-render of component does not resets useRef value.

    useEffect(() => {
        if (postStatus === 'idle' && stopRender.current) {
            console.log('use ref stopRender',stopRender)
            stopRender.current = false
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])
    
    let renderPost;
    if (postStatus === 'pending') {
        renderPost = <p>Loading...</p>
    }
    else if (postStatus === 'succeeded') {
        renderPost = postsData.map(post => <Link  key={post.id} to={`${post.id}`}><SinglePost post={post} /></Link>)
    }
    else if (postStatus === 'failed') {
        renderPost = <p>{postError}</p>
    }
    return (
        <>
            {renderPost}
        </>
    )
}
export default PostsList