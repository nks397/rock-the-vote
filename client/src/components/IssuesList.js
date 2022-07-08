import React, {useContext} from "react"
import PublicIssues from "./PublicIssues"
import Issue from "./Issue"
import {AuthContext} from "../context/AuthProvider"

function IssuesList() {

    const {issues} = useContext(AuthContext)

    return (
        <div>
            {issues.map((issue) => 
                <>
                    <PublicIssues key={issue._id} {...issue} />
                    <Issue {...issue} key={issue._id} />
                </>
            )}
        </div>
    )
}

export default IssuesList