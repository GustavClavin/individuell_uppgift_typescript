import React, { useState } from 'react'

import { useUser } from "../utils/contexts/UserContext"
import { useAuth } from '../utils/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'



const LoginForm = () => {
    const users:UsersState = useUser()
    const auth: AuthState = useAuth()
    
    const [userName, setUserName] = useState<string>('')
    
    const navigate = useNavigate()
    const onSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        if(users.users){
            const userExists = users.users.some((user) => user.userName === userName)

            if(!userExists){
                const newUser: User = {
                    id: users.users.length + 1,
                    userName: userName
                }
                users.actions.saveUser(newUser)
                auth.login(newUser)
            }
            else{
                const existingUser: User | undefined = users.users.find((user) => user.userName === userName)
                if(existingUser){
                    auth.login(existingUser)
                }
            } 
        }else{
            //in case the @LS_USERS collections does not already exist on localStorage
            const firstUser: User = {
                id: 1,
                userName: userName
            }
            users.actions.saveFirstUser([firstUser])
            
            auth.login(firstUser)
        }
    
        navigate('/')
        
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value)
    }

    return (
        <div className="loginFormContainer">
            <form action="" id="loginForm" onSubmit={onSubmit}>
                <h2>Enter User Information</h2>
                <input type="text" required id="loginformUsername"  placeholder="User Name" onChange={handleInputChange} />
                <button type="submit">To Store</button>
            </form>
            
        </div>
    )
}

export default LoginForm