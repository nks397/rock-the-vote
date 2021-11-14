import React, {useContext, useEffect} from "react"
import IssueForm from "./IssueForm"
import IssueList from "./IssueList"
import {AuthContext} from "../context/AuthProvider"

function Profile() {
    const { getUserIssues, addIssue, issues, user, _id} = useContext(AuthContext)

console.log(issues, "issuesProfile")

    useEffect(() => {
        getUserIssues()
    }, [])

    return (
        <div className="profile-container">
            <h1 className="username">Welcome @{user.username}!</h1>
            <h3 className="state-issue-title">State Your Issue</h3>
            <IssueForm submit={addIssue} btnText="Add Issue" _id={_id}/>
            <div className="issues-container">  
                {/* <div className="empty-div"></div>   */}
                <IssueList issues={issues}/>
                {/* <div className="empty-div"></div>  */}
            </div>
        </div>
    )
}

export default Profile