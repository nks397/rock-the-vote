import React, {useContext, useState} from "react"
import { UserContext } from "../context/AuthProvider"
import IssueForm from "./IssueForm"
import Comments from "./Comments"
import UpvoteDownvote from "./UpvoteDownvote"

function Issue(props) {
    const {title, description, _id, comment} = props
    const {deleteIssue, updateIssue} = useContext(UserContext)
    const [editToggle, setEditToggle] = useState(false)
    // const [commentToggle, setCommentToggle] = useState(false)
    
    return(
        <div>
            <br/>   
            <h2><b>{title}</b></h2>
            <p>Description: {description}</p>
            <br/>
            <button onClick={()=>deleteIssue(_id)}>Delete</button>
            <button onClick={()=> setEditToggle(!editToggle)}>{!editToggle ? "Edit" : "Cancel"}</button>
            <br/>
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
            <br/>
            <UpvoteDownvote _id={_id} />
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

export default Issue
