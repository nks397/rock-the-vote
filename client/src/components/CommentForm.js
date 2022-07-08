import React, {useState, useContext} from "react"
import { AuthContext } from "../context/AuthProvider"

function CommentForm(props) {
    const [comment, setComment] = useState("")
    const {user, postComments} = useContext(AuthContext)
    const {_id} = props

    function handleChange(e){
        setComment(e.currentTarget.value)
    }

    const commentData = {
        comment,
        writer: user._id,
        issueId: _id,
    }

    function handleSubmit(e){
        e.preventDefault()
        postComments(commentData, _id)
        setComment("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    placeholder="Post a comment..."
                />
                <button>Add Comment</button>
            </form>
        </div>
    )
}

export default CommentForm