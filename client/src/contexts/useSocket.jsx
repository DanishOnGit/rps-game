import { createContext, useContext } from 'react';
import { socket } from '../socket';
console.log({socket})
const SocketContext = createContext({});

export const useSocket = ()=> useContext(SocketContext);

const SocketProvider=({children})=>{
    console.log({socket})
    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider