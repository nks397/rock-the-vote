import React, {useContext, useState} from "react"
import { UserContext } from "../context/AuthProvider"
import IssueForm from "./IssueForm"
import Comments from "./Comments"
import UpvoteDownvote from "./UpvoteDownvote"

function Issue(props) {
    const {title, description, _id, comment} = props
    const {deleteIssue, updateIssue} = useContext(UserContext)
    const [editToggle, setEditToggle] = useState(false)
    const [commentToggle, setCommentToggle] = useState(false)
    
    return(
        <div>
            <h2>Title: {title}</h2>
            <h3>Description: {description}</h3>
            <button onClick={()=>deleteIssue(_id)}>Delete</button>
            <button onClick={()=> setEditToggle(!editToggle)}>{!editToggle ? "Edit" : "Cancel"}</button>
            {editToggle ? 
                <div>
                    <IssueForm 
                        title={title} 
                        description={description} 
                        submit={updateIssue}
                        _id={_id}
                        btnText="Edit Issue"
                    />
                </div> : 
                null
            }

            <UpvoteDownvote _id={_id}/>

            <button onClick={()=> setCommentToggle(!commentToggle)}>Comments</button>
            { commentToggle ? 
                <div>
                    {console.log(comment, "commentsss")}
                    <Comments key={_id} comment={comment} _id={_id}/>
                </div> : 
                null 
            } 
            <hr/>   
        </div>
    )
}

export default Issue
