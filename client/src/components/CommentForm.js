import React, {useState, useContext} from "react"
import { UserContext } from "../context/AuthProvider"

const initInput = {
    comment: ""
}

function CommentForm(props) {
    const [commentInput, setCommentInput] = useState(initInput)
    const {postComments} = useContext(UserContext)
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
        postComments(_id)
        setCommentInput(initInput)
    }

const {comment} = commentInput
    return (
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
    )
}

export default CommentForm