import React, {useContext, useState} from "react"
import { UserContext } from "../context/AuthProvider"
import Comments from "./Comments"
import UpvoteDownvote from "./UpvoteDownvote"

function PublicIssue(props) {
    const {title, description, _id, comment} = props
    const {commentList, user} = useContext(UserContext)
    const [commentToggle, setCommentToggle] = useState(false)
    
    return(
        <div>
            {/* Add user for each individual post for global issues */}
            
            <h2>Title: {title}</h2>
            <h3>Description: {description}</h3>

            <UpvoteDownvote _id={_id}/>

            <button onClick={()=> setCommentToggle(!commentToggle)}>Comments</button>
            { commentToggle ? 
                <div>
                    Comment Section Open: 
                    {console.log(comment, "commentsss")}
                    <Comments key={_id} comment={comment} _id={_id} commentList={commentList} />

                </div> : 
                null 
            } 
            <hr/>   
        </div>
    )
}

export default PublicIssue
