import React, {useContext, useState} from "react"
// import {IssuesContext} from "../context/IssuesProvider"
import { UserContext } from "../context/AuthProvider"
import IssueForm from "./IssueForm"
import CommentForm from "./CommentForm"

function Issue(props) {
    const {title, description, _id, updateIssue} = props
    const {addIssue, deleteIssue} = useContext(UserContext)
    const [editToggle, setEditToggle] = useState(false)
    const [commentToggle, setCommentToggle] = useState(false)

    return(
        <div>
            <h2>Title: {title}</h2>
            <h3>Description: {description}</h3>
            <button onClick={()=>deleteIssue(_id)}>Delete</button>
            <button onClick={()=> setEditToggle(!editToggle)}>{!editToggle ? "Edit" : "Cancel"}</button>
            {editToggle ? <div><IssueForm title={title} description={description} submit={updateIssue} btnText="Edit Issue"/></div> : null}
            <button><i className="fas fa-thumbs-up"></i></button>
            <button><i className="fas fa-thumbs-down"></i></button>
            <button onClick={()=> setCommentToggle(!commentToggle)}>Comments</button>
            { commentToggle ? <div>Comment Section Open: <CommentForm _id={_id}/></div> : null } 
            <hr/>   
        </div>
    )
}

export default Issue
