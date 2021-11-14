import React, {useContext, useEffect} from "react"
import { AuthContext } from "../context/AuthProvider"
import PublicIssuesList from "./PublicIssuesList"

function Public() {
    const {getAllIssues, issues} = useContext(AuthContext)

    console.log(issues)

    useEffect(() => {
        getAllIssues()
    }, [])
    
    return (
        <div className="public-container">
            <h1 className="global-issues-title">Global Issues</h1>
            <div className="issues-container">
            <div className="empty-div"></div>
                <PublicIssuesList 
                    issues={issues}
                />
            <div className="empty-div"></div>
            </div>
        </div>
    )
}

export default Public