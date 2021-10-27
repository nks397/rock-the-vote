import React, {useContext, useEffect} from "react"
import { UserContext } from "../context/AuthProvider"
import PublicIssuesList from "./PublicIssuesList"

function Public() {
    const {getAllIssues, issues} = useContext(UserContext)

    console.log(issues)

    useEffect(() => {
        getAllIssues()
    }, [])
    
    return (
        <div>
            <h1 className="global-issues-title">Global Issues</h1>
            <PublicIssuesList 
                issues={issues}
            />
        </div>
    )
}

export default Public