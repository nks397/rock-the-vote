import React from "react"
import CommentForm from "./CommentForm"

function Comment(props) {
    const {comment, _id} = props
    
    return (
        <div>
            <br/>
            <CommentForm _id={_id}/>
            {console.log(comment, "COMMENT")}
            {/* List of Comments: */}
            {comment.map((item, index) =>  
                <div key={index}>
                    <p>{item.comment}</p>
                    <p>submitted by @{item.username}</p>
                    <p>submitted {item.timeStamps}</p>
                    <hr/>
                </div>
            )}
            {console.log(comment.timeStamps, "commentTimestamps")}
        </div>
    )
}

export default Comment