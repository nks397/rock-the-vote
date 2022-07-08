import React, {useContext, useEffect} from "react"
import IssueForm from "./IssueForm"
import IssuesList from "./IssuesList"
import {AuthContext} from "../context/AuthProvider"

function Profile() {
    const { getUserIssues, addIssue, user, _id} = useContext(AuthContext)

    useEffect(() => {
        getUserIssues()
    }, [])

    return (
        <div className="profile-container">
            <h1 className="username">{`Welcome ${user.username}!`}</h1>
            <h3 className="state-issue-title">State Your Issue</h3>
            <IssueForm submit={addIssue} btnText="Add Issue" _id={_id}/>
            <div className="issues-container">  
                <IssuesList />
            </div>
        </div>
    )
}

export default Profile