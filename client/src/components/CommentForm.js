import React, {useState, useContext} from "react"
import { UserContext } from "../context/AuthProvider"

function CommentForm(props) {
    const [commentInput, setCommentInput] = useState("")
    const {postComments, deleteComments} = useContext(UserContext)
    const {_id} = props
    // add comment and see all comments for that issue depending on its id

    function handleChange(e){
        const {name, value} = e.target
        setCommentInput(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        postComments(commentInput, _id)
        setCommentInput("")
    }

const {comment} = commentInput
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    placeholder="Comment"
                />
                <button>Add Comment</button>
            </form>
            <button onClick={()=> deleteComments(_id)}>Delete Comment</button>
        </div>
    )
}

export default CommentForm