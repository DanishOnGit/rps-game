import { createContext, useContext, useState } from 'react';


const UserContext = createContext();
export const useUserContext =()=>useContext(UserContext);


const UserContextProvider=({children})=>{
    const [currentPlayers,setCurrentPlayers]=useState([]);
    const [roomId,setRoomId]=useState(null)
    const [inGamePlayers,setInGamePlayers]=useState({player1:'',player2:''})

    return <UserContext.Provider value={{currentPlayers,setCurrentPlayers,roomId,setRoomId,inGamePlayers,setInGamePlayers}}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider