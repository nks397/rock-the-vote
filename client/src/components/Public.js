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
            The Public
            <IssueList issues={issues} />
        </div>
    )
}

export default Public