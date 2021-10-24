import React from "react"
import Issue from "./Issue"

function IssueList(props) {
    const {issues} = props
    return (
        <div>
            {issues.map(issue => <Issue {...issue} key={issue._id}/>)}
            {issues.map(issue => console.log(issue, "ISSUE") )}
           
        </div>
    )
}

export default IssueList