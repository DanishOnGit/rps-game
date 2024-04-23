import React, { useEffect } from 'react'
import { useUserContext } from './contexts/userContext'
import Button from './components/Button'
import { useSocket } from './contexts/useSocket';

const GameLobby = () => {
    const { currentPlayers,setCurrentPlayers} = useUserContext();
    const {socket}=useSocket()
    const startGame=()=>{
        socket.emit("createGame",(res)=>{
            console.log({res})
        })
    }

    useEffect(()=>{
        socket.emit('getAllPlayers',(data)=>{
            setCurrentPlayers(data)
        })
    },[])

    return (
        <div>
            {
                currentPlayers.map(player => <li>
                    {player.name}
                    <Button text={"Play"} onClick={startGame} />
                </li>)
            }
        </div>
    )
}

export default GameLobby