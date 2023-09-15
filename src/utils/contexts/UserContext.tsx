import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import { getUsersFromLocalStorage, saveUserToLocalStorage } from "../helpers/localStorage"




const defaultState: UsersState = {
    users: [],
    
    actions: {
        saveUser: (user) => {},
        saveFirstUser: (users) => {}
    }
}

const UserContext = createContext<UsersState>(defaultState)

const UserProvider = ({children}: PropsWithChildren) => {
    const [users, setUsers] = useState<User[]>(defaultState.users)
    
    
    useEffect(() => {
        _getUsersFromLocalStorage()
    },[])

    const _getUsersFromLocalStorage = (): void => {
        const storedUsers: User[] = getUsersFromLocalStorage()
        setUsers(storedUsers)
    }

    const saveUser = (user: User):void => {
        setUsers(state => {
            const newUsers: User[] = [...state, user]
            saveUserToLocalStorage(newUsers)
            return newUsers
        })
    }

    const saveFirstUser = (users: User[]): void => {
        setUsers(users)
        setUsers(users)
        saveUserToLocalStorage(users)
    }

    return (
        <UserContext.Provider 
            value={{
                users,
                
                actions: {
                    saveUser,
                    saveFirstUser
                }
            }}>
                {children}
        </UserContext.Provider>

    )
}

const useUser = () => {
    const users = useContext(UserContext)
    return users
}

export {
    UserProvider,
    useUser
}