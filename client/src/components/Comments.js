import React from "react"
import CommentForm from "./CommentForm"

function Comment(props) {
    const {comment, _id, commentList} = props
    return (
        <div>
            <br/>
            <p>replies</p>
            <CommentForm _id={_id}/>
            {/* List of Comments: */}
            {console.log(commentList, "CommentList")}
            {commentList.map((issue, index) => 
            // same comments show up for all issues
                (!issue.responseTo ?
                    <div>
                        <p>Username: {issue.writer.username}</p>
                        <p>Comment: {issue.comment}</p>
                    </div> 
                    : null
                )
            )}
            {/* form */}
            
            {console.log(comment, "my commments from Comments")}
        </div>
    )
}

export default Comment