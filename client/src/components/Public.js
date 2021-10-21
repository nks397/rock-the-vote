import React, {useContext, useEffect} from "react"
import IssueList from "./IssueList"
import { UserContext } from "../context/AuthProvider"

function Public(props) {
    const {getAllIssues, issues} = useContext(UserContext)
    console.log(issues)

    useEffect(() => {
        getAllIssues()
    }, [])
    
    return (
        <div>
            <h1 className="global-issues-title">Global Issues</h1>
            <IssueList issues={issues} />
        </div>
    )
}

export default Public