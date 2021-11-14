import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from "./components/Profile"
import Public from './components/Public'
import { AuthContext } from './context/AuthProvider'

export default function App(){
  const { token, logout} = useContext(AuthContext)
  
  return (
    <div className="app">
      {token && <Navbar logout={logout}/>}
      <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to="/profile"/> : <Auth />}
        />
        <ProtectedRoute 
          path="/profile"
          component={Profile}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute 
          path="/public"
          component={Public}
          redirectTo="/"
          token={token}
        />
      </Switch>
    </div>
  )
}