import React, {useContext, useEffect} from "react"
import IssueForm from "./IssueForm"
import IssueList from "./IssueList"
import {UserContext} from "../context/AuthProvider"

function Profile() {
    const { getUserIssues, addIssue, issues, user, _id, getComments} = useContext(UserContext)

console.log(issues, "issuesProfile")

    useEffect(() => {
        getUserIssues()
    }, [])

    return (
        <div>
            <h1 className="username">Welcome @{user.username}!</h1>
            <h3 className="add-issue-title">Add Issue</h3>
            <IssueForm submit={addIssue} btnText="Add Issue" _id={_id}/>
            {/* <h3>Your Issues</h3> */}
            <IssueList issues={issues}/>
        </div>
    )
}

export default Profile