import React from "react"
import PublicIssues from "./PublicIssues"


function PublicIssuesList(props) {
    const {issues} = props
    return (
        <div>
            {issues.map((issue) => <PublicIssues key={issue._id} {...issue} />)}
        </div>
    )
}

export default PublicIssuesList