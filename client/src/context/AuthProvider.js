import React, {useState} from "react"
import axios from "axios"

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    // get token
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function AuthProvider(props) {
    // inputs
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issues: [],
        comments: [], 
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
        // dir console logs in object so we can look at its key: value pairs
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
            issues: [],
            comments: []
        })
    } 
    
    function handleAuthErr(errMsg) {
        // update userState
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
        // issue with endpoint
        userAxios.get("/api/issue/user")
        .then(res => 
            setUserState(prevState => ({
                ...prevState,
                // res.data is used for initial get request. It just grabs our data object?
                issues: res.data
            }))
        )
        .catch(err => console.log(err.response.data.errMsg))
    }

    // // adding issues
    function addIssue(newIssue) {
        userAxios.post("/api/issue", newIssue)
        // .then(res => console.log(res))
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
        .then(res => {
            setUserState(prevState => prevState.issues.map(issues => issues._id !== issueId ? issues : res.data))
        })
        .catch(err => console.log(err))
        return getUserIssues()
    }

    // ***comments section***

    // get comment by issue
    // function getComments(commentId) {
    //     userAxios.post(`/api/issue/${commentId}/comments`)
    // }
    
    function postComments(newComment, commentId) {
        userAxios.post(`/api/issue/${commentId}/comments`, newComment)
        .then(res => {
            setUserState(prevState => ({
                ...prevState, issues: [...prevState.comments, res.data]
            }))
        })
        .catch(err => console.log(err))
    }

    function deleteComments(commentId) {
        userAxios.delete(`/api/issue/${commentId}/comments`)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                comments: prevState.comments.filter(comment => comment._id !== commentId)
            }))})
            .catch(err => console.log(err)
            )
            // return getComments()
    }

    return (
        <UserContext.Provider 
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
                postComments,
                deleteComments
            }}>
            {props.children}
        </UserContext.Provider>
    )
}