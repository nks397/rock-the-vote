import React, {useContext, useEffect} from "react"
import { AuthContext } from "../context/AuthProvider"
import IssuesList from "./IssuesList"

function Public() {
    const {getAllIssues} = useContext(AuthContext)

    useEffect(() => {
        getAllIssues()
    }, [])
    
    return (
        <div className="public-container">
            <h1 className="global-issues-title">Global Issues</h1>
            <div className="issues-container">
                <div className="empty-div"></div>
                    <IssuesList />
                <div className="empty-div"></div>
            </div>
        </div>
    )
}

export default Public