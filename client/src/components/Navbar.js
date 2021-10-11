import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/AuthProvider'

export default function Navbar(props){
  const { logout } = props
  // const {logout} = useContext(UserContext)

  return (
    <div className="navbar">
      <Link to="/profile">Profile</Link>
      <Link to="/public">Public</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}