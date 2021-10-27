import React from "react"
import PublicIssues from "./PublicIssues"


function PublicIssuesList(props) {
    const {issues} = props
    return (
        <div>
            {issues.map(issue => <PublicIssues {...issue} key={issue._id}/>)}
        </div>
    )
}

export default PublicIssuesList