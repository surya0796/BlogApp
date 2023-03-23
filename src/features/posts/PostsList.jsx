import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import SinglePost from './SinglePost';


const PostsList = () => {
    const { postsData, error: postError, status: postStatus } = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const stopRender = useRef(true) // useRef has two rules: changing useRef does not re-renders component; also rerender of component resets useRef value.

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
        renderPost = postsData.map(post => <SinglePost key={post.id} post={post} />)
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