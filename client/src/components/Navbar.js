import React from 'react'
import { Link } from 'react-router-dom'
// import rtvBlue from "../images/rtvBlue.png"

export default function Navbar(props){
  const { logout } = props

  return (
    <div className="navbar">
      <h3 className="logo">ROCK THE <i className="far fa-check-square"></i>OTE </h3>
      <Link to="/profile">Profile</Link>
      <Link to="/public">Public</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}