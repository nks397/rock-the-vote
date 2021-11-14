import React, {useContext} from "react"
// import {AuthContext} from "../context/AuthProvider"
import Comments from "./Comments"
import UpvoteDownvote from "./UpvoteDownvote"
// import Issue from "./Issue"

function PublicIssue(props) {
    const {title, description, _id, comment, upvote, downvote, votedUsers, username, timeStamps} = props

    return(
        <div>
            <br/>
            <h2><b>{title}</b></h2>
            <h3>Description: {description}</h3>
            <p>{`submitted by @${username}`} </p>
            <p>{`submitted at ${timeStamps}`}</p>

            {console.log(username, "issues username")}
            {console.log(timeStamps, "timestamps")}
            <br/>
            <UpvoteDownvote _id={_id} upvote={upvote} downvote={downvote} votedUsers={votedUsers} />
            <br/>
            <details><summary>{`Comments(${comment.length})`}</summary><Comments key={_id} comment={comment} _id={_id}/></details>

            {/* <Issue title={title} description={description}></Issue> */}
            <br/>
            <hr/>   
        </div>
    )
}

export default PublicIssue
