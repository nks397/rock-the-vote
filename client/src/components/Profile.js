import React, {useContext, useEffect} from "react"
import IssueForm from "./IssueForm"
import IssueList from "./IssueList"
import {UserContext} from "../context/AuthProvider"

function Profile() {
    const { getUserIssues, addIssue, issues} = useContext(UserContext)

console.log(issues, "issuesProfile")

    useEffect(() => {
        getUserIssues()
    }, [])

    return (
        <div>
            {/* <h1>Welcome @{username}!</h1> */}
            My Profile
            <h3>Add Issue</h3>
            <IssueForm addIssue={addIssue}/>

            <h3>Your Issues</h3>
            <IssueList issues={issues}/>
        </div>
    )
}

export default Profile