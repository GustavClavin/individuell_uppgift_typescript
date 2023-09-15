import React, { createContext, useContext, useState, PropsWithChildren} from 'react';

const defaultState: AuthState = {
    currentUser: null,
    login() {},
    logout() {}
    
}

const AuthContext = createContext<AuthState>(defaultState);


const AuthProvider = ({children}: PropsWithChildren) => {
    const [currentUser, setCurrentUser] = useState<User|null>(defaultState.currentUser)

    const login = (user: User):void => {
        setCurrentUser(user)
    }

    const logout = ():void => {
        setCurrentUser(null)
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () => {
    const { currentUser, login, logout } = useContext(AuthContext);
    return { currentUser, login, logout };
}

export {
    AuthProvider,
    useAuth
}