import React from "react"
import CommentForm from "./CommentForm"

function Comment(props) {
    const {comment, _id} = props
    return (
        <div>
            <br/>
            <p>replies</p>
            <CommentForm _id={_id}/>
            {console.log(comment, "COMMENT")}
            {/* List of Comments: */}
            {comment.map((item, index) =>  
                <div key={index}>
                    <p>Username: {item.username}</p>
                    <p>Comment: {item.comment}</p>
                </div>
            )}
        </div>
    )
}

export default Comment