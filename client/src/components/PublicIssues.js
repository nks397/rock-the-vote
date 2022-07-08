import React, {useContext} from "react"
import Comments from "./Comments"
import UpvoteDownvote from "./UpvoteDownvote"

function PublicIssue(props) {
    const {
        title, 
        description, 
        _id, comment, 
        upvote, 
        downvote, 
        votedUsers, 
        username, 
        timeStamps
    } = props

    return(
        <div>
            <br/>
            <h2><b>{`Title: ${title}`}</b></h2>
            <h3 className="description">{`Description: ${description}`}</h3>
            <p className="submitted-info">{`submitted by @${username}`} </p>
            <p className="submitted-info">{`submitted ${new Date(timeStamps).toDateString()}`}</p>
            <br/>
            <UpvoteDownvote _id={_id} upvote={upvote} downvote={downvote} votedUsers={votedUsers} />
            <br/>
            <details><summary>{`Comments(${comment.length})`}</summary><Comments key={_id} comment={comment} _id={_id}/></details>
            <br/>
            <hr/>   
        </div>
    )
}

export default PublicIssue
