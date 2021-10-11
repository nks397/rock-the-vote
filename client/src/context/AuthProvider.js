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
        issues: []
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
        .catch(err => console.dir(err.response.data.errMsg))
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
        .catch(err => console.dir(err.response.data.errMsg))
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
        // Error: DELETE http://localhost:3000/api/issues/615e4f9ac1a44e163c709312 404 (Not Found)
        // request is coming up undefined
        userAxios.delete(`/api/issues/${issueId}`)
            .then(() => {
                setUserState(prevState => prevState.issues.filter(issue => issue._id !== issueId))
            })
            // console.log(userState, "US")
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function updateIssue(updates, issueId) {
        userAxios.put(`api/issue/${issueId}`, updates)
        .then(res => {
            setUserState(prevState => prevState.issues.map(issues => issues._id !== issueId ? issues : res.data))
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    // ***comments section***
    function postComments(issueId) {
        userAxios.post(`/api/issue/${issueId}/comments`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <UserContext.Provider 
            value={{
                ...userState,
                signup,
                login, 
                logout,
                addIssue,
                deleteIssue,
                getUserIssues,
                updateIssue,
                getAllIssues,
                postComments
            }}>
            {props.children}
        </UserContext.Provider>
    )
}