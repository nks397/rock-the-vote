import React, {useState} from "react"
import axios from "axios"

export const AuthContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    // get token
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function AuthProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        errMsg: ""
    }
    const [userState, setUserState] = useState(initState)
    // signup and login route

    function signup(credentials) {
        // the signup in the backend is a post request
        axios.post("/auth/signup", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState, user, token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials) {
        userAxios.post("/auth/login", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getUserIssues()
            setUserState(prevState => ({
                ...prevState, user, token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        // reset local storage
        localStorage.removeItem("user")
        localStorage.removeItem("token")

        // reset state
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    } 
    
    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

// getting all issues (public)
    function getAllIssues() {
        userAxios.get("/api/issue/")
        .then(res => {
            setUserState(prevState => ({
                ...prevState, issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    // Get User Issues  
   function getUserIssues() {
        userAxios.get("/api/issue/user")
        .then(res => 
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        )
        .catch(err => console.log(err.response.data.errMsg))
    }

    // // adding issues
    function addIssue(newIssue) {
        userAxios.post("/api/issue", newIssue)
        .then(res => {
            setUserState(prevState => ({
                ...prevState, issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function deleteIssue(issueId) {
        userAxios.delete(`/api/issue/${issueId}`)
            .then(res => setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.filter(issue => issue._id !== issueId)
            })))
            .catch(err => console.log(err)
            )
        return getUserIssues()
    }

    function updateIssue(updates, issueId) {
        userAxios.put(`api/issue/${issueId}`, updates)
        .then(res => setUserState(prevState => ({
            ...prevState,
            issues: prevState.issues.map(issue => issue._id !== issueId ? issue : res.data)
        })))

        .catch(err => console.log(err))
        return getUserIssues()
    }

    // ***comments section***

    // get all comments by issue
    function getComments(issueId) {
        userAxios.post(`/api/issue/${issueId}/getComment`)
        .then(res => 
                console.log(res.data, "getcommentByIssuedata")
            )
        .catch(err => console.log(err.response.data.errMsg))
    }

    function postComments(newComment, issueId) { 
        userAxios.post(`/api/issue/${issueId}/saveComment`, newComment)
        .then(res => {
            setUserState(prevState => ({
                ...prevState, 
                issues: [...prevState.issues.map(issue => issue._id === issueId ? res.data : issue)]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function handleVote(vote, issueId){
        userAxios.put(`/api/issue/${vote}/${issueId}`)
            .then(res => 
                setUserState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues.map(issue => issue.id === issueId ? res.data : issue)]
                }))
            )
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <AuthContext.Provider 
            value={{
                ...userState,
                signup,
                login, 
                logout,
                resetAuthErr,
                addIssue,
                deleteIssue,
                getUserIssues,
                updateIssue,
                getAllIssues,
                getComments,
                postComments,
                handleVote,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}