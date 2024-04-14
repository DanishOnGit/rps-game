import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button.jsx';
import { useSocket } from './contexts/useSocket.jsx';
import UserAuthentication from './UserAuthentication.jsx';

function App() {
  const { socket } = useSocket()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [showLogin, setShowLogin] = useState(false)

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

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <>
      <Button text={"Connect"} onClick={connectSocket} />
      <Button text={"Disconnect"} onClick={disconnectSocket} />
      <Button text={"Play"} onClick={()=>setShowLogin(true)}/>
      {showLogin && <UserAuthentication />}
    </>
  )
}

export default App
