import React from "react"
import CommentForm from "./CommentForm"

function Comment(props) {
    const {comment, _id} = props

    return (
        <div>
            <br/>
            <CommentForm _id={_id}/>
            {comment.map((item, index) =>  
                <div key={index}>
                    <p className="description">{item.comment}</p>
                    <p className="submitted-info">{`submitted by @${item.username}`}</p>
                    <p className="submitted-info">{`submitted ${new Date(item.timeStamps).toDateString()}`}</p>
                    <hr/>
                </div>
            )}
        </div>
    )
}

export default Comment