import React from 'react' 
import ReactDOM from 'react-dom' 
import { BrowserRouter } from "react-router-dom"
import UserContext from './context/AuthProvider'
// import IssuesContext from "./context/IssuesProvider"
import './styles.css' 
import App from './App'

ReactDOM.render(
  <BrowserRouter>
      <UserContext>
          <App />
      </UserContext>
  </BrowserRouter>,
  document.getElementById('root')
)
