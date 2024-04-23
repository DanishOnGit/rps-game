import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button.jsx';
import { useSocket } from './contexts/useSocket.jsx';
import UserAuthentication from './UserAuthentication.jsx';
import { useUserContext } from './contexts/userContext.jsx';

function App() {
  const { socket } = useSocket()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showLogin, setShowLogin] = useState(false)
  const {setCurrentPlayers}=useUserContext()
  const disconnectSocket = () => {
    socket.disconnect()
  }
  const connectSocket = () => {
    socket.connect()
  }


  useEffect(() => {
    function onConnect() {
      console.log('onConnect ran...')
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('onDISConnect ran...')
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log("fooing...")
      // setFooEvents(previous => [...previous, value]);
    }

    function updateOnlinePlayers(players){
      console.log({players})
      setCurrentPlayers(players)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
    socket.on('updatePlayerList',updateOnlinePlayers)
    socket.on('usernameNotUnique',()=>alert("Enter a unique username"))
    socket.on('playerLeft',(data)=>{
      console.log({data})
      setCurrentPlayers(prev=>prev.filter(player=>player.id!==data.id))
    })
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <>
      <Button text={"Play"} onClick={()=>setShowLogin(true)}/>
      {showLogin && <UserAuthentication />}
    </>
  )
}

export default App
