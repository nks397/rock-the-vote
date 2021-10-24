import React, {useState, useContext} from "react"
import { UserContext } from "../context/AuthProvider"

function CommentForm(props) {
    // const initInputs = {
    //     comment: ""
    // }
    // const [commentInput, setCommentInput] = useState(initInputs)
    const [comment, setComment] = useState("")
    const {user, issues, postComments, deleteComments} = useContext(UserContext)
    const {_id} = props
    // add comment and see all comments for that issue depending on its id

    function handleChange(e){
        const {name, value} = e.target
        setComment(e.currentTarget.value)
        //     prevComment => ({
        //     ...prevComment,
        //     [name]: value
        // })
        // )
    }

    const commentData = {
        comment,
        writer: user._id, 
        issueId: _id
    }

    function handleSubmit(e){
        e.preventDefault()
        postComments(commentData)
        setComment("")
        // console.log(user, "USER")
        console.log(commentData, "COMMENTDATA")
        console.log(issues, "ISSUES")
    }

// const {comment} = commentInput
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
            <button onClick={()=> deleteComments(_id)}>Delete Comment</button>
        </div>
    )
}

export default CommentForm