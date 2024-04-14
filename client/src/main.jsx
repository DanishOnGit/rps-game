import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from './contexts/userContext.jsx'
import SocketProvider from './contexts/useSocket.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GameLobby from './GameLobby.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/lobby",
    element: <GameLobby />,
  },
  {
    path: "/gameplay",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <UserContextProvider>
        <RouterProvider router={router}/>
      </UserContextProvider>
    </SocketProvider>
  </React.StrictMode>,
)
