// import React, {useContext, useState} from "react"
// // import { AuthContext } from "../context/AuthProvider"

// export const ThemeContext = React.createContext()

// export default function ThemeProvider(props) {
//     // const theme = useContext(ThemeContext)
//     // const themeArr = [{
//     //     light: {
//     //         background: "black"
//     //     },
//     //     dark: {
//     //         background: "beige"
//     //     }
//     // }]

//     const [themes, setThemes] = useState()
//     // const [toggleTheme, setToggleTheme] = useState(false)
    
//     function toggleTheme() {
//         // setToggleTheme(
//         //     !toggleTheme === "dark" ? "light" : "dark"
//         // )   
//         setThemes(prevState => {
//             return {
//                 themes: prevState.themes === "dark" ? "light" : "dark"
//             }
//         })
//         console.log(themes,)
//         // console.log("hi")
//     }

//     return (
//         <ThemeContext.Provider 
//             value={{
//                 themes, 
//                 // toggleTheme
//                 toggleTheme
//             }}
//             >
//             {props.children}
//         </ThemeContext.Provider>
//     )
// }