import React, {useContext, useState} from "react"
// import {IssuesContext} from "../context/IssuesProvider"
import { UserContext } from "../context/AuthProvider"
import IssueForm from "./IssueForm"
import CommentForm from "./CommentForm"
import Comments from "./Comments"

function Issue(props) {
    const {title, description, _id, comment} = props
    const {issues, addIssue, deleteIssue, updateIssue, commentList} = useContext(UserContext)
    const [editToggle, setEditToggle] = useState(false)
    const [commentToggle, setCommentToggle] = useState(false)
    
    return(
        <div>
            <h2>Title: {title}</h2>
            <h3>Description: {description}</h3>
            {/* for global issues, remove edit, delete, */}
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
            <button><i className="fas fa-thumbs-up"></i></button>
            <button><i className="fas fa-thumbs-down"></i></button>
            <button onClick={()=> setCommentToggle(!commentToggle)}>Comments</button>
            { commentToggle ? 
                <div>
                    Comment Section Open: 
                    {/* <CommentForm _id={_id}/> */}
                    {console.log(comment, "commentsss")}
                    <Comments comment={comment} _id={_id} commentList={commentList} />

                </div> : 
                null 
            } 
            <hr/>   
        </div>
    )
}

export default Issue
