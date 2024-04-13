import { useEffect, useState } from 'react';
import { socket } from './socket.js';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const getdata=()=>{
    const res = fetch(`${process.env.REACT_APP_API_URL}/test`).then(res=>res.json()).then(data=>console.log(data)).catch(console.error)
  }

  const disconnectSocket=()=>{
    socket.disconnect()
  }
  const connectSocket=()=>{
    socket.connect()
  }
  useEffect(()=>{
    getdata()
  },[])

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
      Hii
      <button onClick={disconnectSocket}>
        Disconnect
      </button>
      <button onClick={connectSocket}>
        Connect
      </button>
    </>
  )
}

export default App
