import React from 'react'
import { useUserContext } from './contexts/userContext'
import Button from './components/Button'
import { useSocket } from './contexts/useSocket';

const GameLobby = () => {
    const { currentPlayers } = useUserContext();
    const {socket}=useSocket()
    const startGame=()=>{
        socket.emit("createGame",(res)=>{
            console.log({res})
        })
    }
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