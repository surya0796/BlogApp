import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";


const AddPostForm = () => {
    // states
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState("")
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    // selectors
    const users = useSelector(selectAllUsers)
    const dispatch = useDispatch()
    // render logic
    const canSave = [title,content,userId].every(Boolean) && addRequestStatus ==='idle'
    const usersOptions = users.map(({ id, name }) => {
        return (
            <option key={id} value={id}>{name}</option>
        )
    })
    //event functions
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)
    const onSavePostClicked = async() => {
        if (!canSave) return
        try {
            setAddRequestStatus('pending')
            await dispatch(addNewPost({ title, body: content, userId })).unwrap()
            // The promise returned by the dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error.
            setTitle('')
            setContent('')
            setUserId('')
        } catch (err) {
            console.error('Failed to save the post:', err.message)
        } finally {
            setAddRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm

