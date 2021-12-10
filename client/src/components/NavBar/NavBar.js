import logo from '../../VVnet1.png'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useState } from "react"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


export const NavBar = () => {
    const auth = useContext(AuthContext)

    return (
        <nav>
            <img id='logo' src={logo} />
            {auth.isSignedIn ? (
                <>
                    <NavLink to={`/profile/${auth.userId}`}>Profile: {auth.userId}</NavLink>
                    <NavLink to="/about" className='nav-right'>About</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <div className="notification-icon"><NotificationsIcon cursor="pointer"
                        sx={{ fontSize: 40, color: "white" }} /></div>
                    <div className="account-icon"><AccountCircleIcon cursor="pointer"
                        sx={{ fontSize: 40, color: "white" }} /></div>
                </>
            ) : (
                <>
                    <NavLink to="/auth" className='nav-right'>Log in</NavLink>
                    <NavLink to="/register">Sign Up</NavLink>
                </>
            )}

        </nav>
    )


    // if (props.isSigned) {
    //     return(
    //     <nav>
    //         <img id='logo' src={logo}></img>
    //         <NavLink to="/about" className='nav-right'>About</NavLink>
    //         <NavLink to="/users">Users</NavLink>
    //       </nav>
    //     )
    // } else {
    //     return(
    //         <nav>
    //         <img id='logo' src={logo}></img>
    //         <NavLink to="/auth" className='nav-right'>Log in</NavLink>
    //         <NavLink to="/register">Sign Up</NavLink>
    //       </nav>
    //     )
    // }
}
