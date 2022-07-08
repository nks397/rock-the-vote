import React, {useContext, useState} from "react"
import { AuthContext } from "../context/AuthProvider"
import IssueForm from "./IssueForm"
import Comments from "./Comments"
import UpvoteDownvote from "./UpvoteDownvote"

function Issue(props) {
    const {
        title, 
        description, 
        _id, 
        comment,
        upvote,
        downvote,
        username,
        issues,
        votedUsers,
        timeStamps
    } = props

    const {deleteIssue, updateIssue} = useContext(AuthContext)
    const [editToggle, setEditToggle] = useState(false)
    
    return(
        <div className="issues-container">
            <br/>   
            <h3 className="issue-title"><b>{`Title: ${title}`}</b></h3>
            <p className="description"><b>{`Description: ${description}`}</b></p>
            <p className="submitted-info">{`submitted ${new Date(timeStamps).toDateString()}`}</p>
            <br/>
            <button onClick={()=>deleteIssue(_id)}><i title="Delete" class="fas fa-trash"></i></button>
            <button onClick={()=> setEditToggle(!editToggle)}>{!editToggle ? <i title="Edit" class="fas fa-edit"></i> : <i title="Cancel" class="fas fa-window-close"></i>}</button>
            <br/>
            {editToggle ? 
                <div className="edit-form">
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
            <UpvoteDownvote _id={_id} upvote={upvote} downvote={downvote} votedUsers={votedUsers} username={username} issues={issues} />
            <br/>
            <details>
                <summary>
                    {`Comments(${comment.length})`}
                </summary>
                <Comments key={_id} comment={comment} _id={_id}/>
            </details>
            <br/>
            <hr/>   
        </div>
    )
}

export default Issue
