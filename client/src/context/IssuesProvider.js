// import React, {useState} from "react"
// import axios from "axios"

// export const IssuesContext = React.createContext()

// const userAxios = axios.create()
// userAxios.interceptors.request.use(config => {
//     // get token
//     const token = localStorage.getItem("token")
//     config.headers.Authorization = `Bearer ${token}`
//     return config
// })

// export default function IssuesProvider(props) {
//     // const [issues, setIssues] = useState([])

//     //  Delete Issues
//     // function deleteIssue(issueId) {
//     //     userAxios.delete(`/api/issue/${issueId}`)
//     //     .then(res => {
//     //         setIssues(prevIssues => prevIssues.filter(issue => issue._id !== issueId))
//     //         .then(setIssues(res))
//     //     })
//     //     .catch(err => console.log(err.response.data.errMsg))
//     // }


//     return (
//         <IssuesContext.Provider 
//             value={{
//                 // deleteIssue,
//             }}>
//             {props.children}
//         </IssuesContext.Provider>
//     )
// }