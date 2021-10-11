import React, {useContext, useState} from "react"
// import {IssuesContext} from "../context/IssuesProvider"
import { UserContext } from "../context/AuthProvider"
import CommentForm from "./CommentForm"

function Issue(props) {
    const {title, description, _id} = props
    const {updateIssue, deleteIssue} = useContext(UserContext)
    const [toggle, setToggle] = useState(false)

    return(
        <div>
            <h2>Title: {title}</h2>
            <h3>Description: {description}</h3>
            <button onClick={()=>deleteIssue(_id)}>Delete</button>
            <button onClick={()=>updateIssue(_id)}>Edit</button>
            <button onClick={()=> setToggle(!toggle)}>Comments</button>
            { toggle ? <div>Comment Section Open: <CommentForm _id={_id}/></div>: null }    
    </div>
    )
}

export default Issue
