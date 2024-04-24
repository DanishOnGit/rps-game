

import React, { useState } from 'react'
import Button from './components/Button'
import { useUserContext } from './contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useSocket } from './contexts/useSocket';

const UserAuthentication = () => {
  const [username, setUsername] = useState("");
  const { currentPlayers, setCurrentPlayers } = useUserContext();
  const navigate = useNavigate();
  const {socket}=useSocket()

  const addUser = () => {
    const isAlreadyPresent = currentPlayers.find(player => player.name === username);
    if (isAlreadyPresent) return;
    socket.connect()
    socket.emit('joinServer',{ name: username, score: 0 },(success)=>{
      if(success) navigate('/lobby')
    })
    setCurrentPlayers(prev => ([...prev, { name: username, score: 0 }]));
    
  }


  return (
    <div className='modal-background'>
      <div className='modal'>
        <input onChange={e => setUsername(e.target.value)} placeholder='Enter a username' />
        <Button text={"Start"} onClick={addUser} />
      </div>
    </div>
  )
}

export default UserAuthentication