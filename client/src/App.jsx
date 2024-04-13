import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const getdata=()=>{
    const res = fetch(`${process.env.REACT_APP_API_URL}/test`).then(res=>res.json()).then(data=>console.log(data)).catch(console.error)
  }

  useEffect(()=>{
    getdata()
  },[])
  return (
    <>
      Hii
    </>
  )
}

export default App
