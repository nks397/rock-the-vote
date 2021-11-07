import React, {useContext, useState} from "react"
// import { UserContext } from "../context/AuthProvider"
import Comments from "./Comments"
import UpvoteDownvote from "./UpvoteDownvote"

function PublicIssue(props) {
    const {title, description, _id, comment, upvote, downvote, votedUsers, username, issues} = props
    // const {user} = useContext(UserContext)
    // const [commentToggle, setCommentToggle] = useState(false)
        
// const date = new Date().getDate()
// const month = new Date().getMonth() + 1
// const year = new Date().getFullYear()
// const time = new Date().getHours()

    return(
        <div>
            {/* Add username for each individual post for global issues */}
            <br/>
            <h2><b>{title}</b></h2>
            <h3>Description: {description}</h3>
            <p>submitted by </p>
            <br/>
            <UpvoteDownvote _id={_id} upvote={upvote} downvote={downvote} votedUsers={votedUsers} username={username} issues={issues}/>
            <br/>
            <details><summary>Comments</summary><Comments key={_id} comment={comment} _id={_id}/></details>

            {/* <button onClick={()=> setCommentToggle(!commentToggle)}>Comments</button>
            { commentToggle ? 
                <div>
                    {console.log(comment, "commentsss")}
                    <Comments key={_id} comment={comment} _id={_id}/>

                </div> : 
                null 
            }  */}
            <br/>
            <hr/>   
        </div>
    )
}

export default PublicIssue
