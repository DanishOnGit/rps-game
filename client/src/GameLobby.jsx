import React, { useEffect } from 'react'
import { useUserContext } from './contexts/userContext'
import Button from './components/Button'
import { useSocket } from './contexts/useSocket';


const GameLobby = () => {
    const { currentPlayers,setCurrentPlayers,setInGamePlayers,inGamePlayers} = useUserContext();
    const {socket}=useSocket()
    console.log({socketId:socket.id})

    function createGame(id){
        setInGamePlayers(prev=>({...prev,player1:id}))
    }

    const startGame=(userId)=>{
        socket.emit("askToPlay",{player1:socket.id,player2:userId},(success)=>{
            setInGamePlayers({player1:socket.id,player2:userId})
        })
    }

    const joinGame=()=>{
        // createGame()
        socket.emit('joinGame')
    }

    useEffect(()=>{
        socket.emit('getAllPlayers',(data)=>{
            setCurrentPlayers(data)
        })
    },[])

    useEffect(()=>{
        if(inGamePlayers.player2){
            setCurrentPlayers(prev=>prev)
        }
    },[JSON.stringify(inGamePlayers)])

    const getLoggedInPlayer=()=>{
        const data = currentPlayers.find(playr=>playr.id===socket.id);
        return data?data.name:''
    }

    const filteredUsers=(currPlayers)=>{
        return currPlayers.filter(plyr=>plyr.id!==socket.id)
    }
    return (
        <div>
           <h1> Rock-Paper-Scissors</h1>
            <h3>Hii {getLoggedInPlayer()}</h3>
            {
                filteredUsers(currentPlayers).map(player => <li key={player.id}>
                    {player.name}
                    <Button text={"Play"} onClick={()=>startGame(player.id)} />

                </li>)
            }
        </div>
    )
}

export default GameLobby