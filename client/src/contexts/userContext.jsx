import { createContext, useContext, useState } from 'react';


const UserContext = createContext();
export const useUserContext =()=>useContext(UserContext);


const UserContextProvider=({children})=>{
    const [currentPlayers,setCurrentPlayers]=useState([]);

    return <UserContext.Provider value={{currentPlayers,setCurrentPlayers}}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider