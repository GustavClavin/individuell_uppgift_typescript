import React, { useState } from 'react'
import '../styles/header.css'
import { useAuth } from "../utils/contexts/AuthContext"
import { useNavigate, useLocation } from 'react-router-dom'
import Cart from './Cart'


const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth: AuthState = useAuth()
    
    const handleNav = (e: React.MouseEvent<HTMLButtonElement>): void => {
        
        switch (e.currentTarget.id){
            case('loginButton'):
                navigate('/login')
                break;
            case('changeUserButton'):
                auth.logout()
                navigate('/login')
                break;
               
            case('logoutButton'):
                auth.logout()
                break;
             
            case('storeButton'):
                navigate('/')
                break;    
        }
    }


    return (
        <div className='header'>
            <div className='navButtons'>
            {!auth.currentUser ?(
                <button id='loginButton' onClick={handleNav}>Login</button>
                
            ):(
                <>
                    <button id='changeUserButton' onClick={handleNav}>Change User</button>
                    <button id='logoutButton' onClick={handleNav}>Logout</button>
                </>
            )}
            {location.pathname != '/' && (
                <button id='storeButton' onClick={handleNav}>Back to store</button>
            )
            }
            </div>
            
            <div className="cart">
            <Cart></Cart>
            </div>
            
        </div>
    )
}

export default Header