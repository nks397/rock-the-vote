import React from 'react' 
import ReactDOM from 'react-dom' 
import { BrowserRouter } from "react-router-dom"
import AuthContext from './context/AuthProvider'
// import ThemeContext  from "./context/ThemeProvider"
import './styles.css' 
import App from './App'

ReactDOM.render(
  <BrowserRouter>
      <AuthContext>
        {/* <ThemeContext> */}
          <App />
        {/* </ThemeContext> */}
      </AuthContext>
  </BrowserRouter>,
  document.getElementById('root')
)
