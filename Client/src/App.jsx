import { useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useEffect } from 'react'
import axios from 'axios'
import ProtectedRoute from './Components/ProtectedRoute'
import Builder from './pages/Builder'
import Navbar from './Components/Navbar'
import Billing from './pages/Billing'
import { Toaster } from "react-hot-toast"

export const ServerUrl = "http://localhost:8000"
export const CLIENT_URL = "http://localhost:5173"

function App() {
  const [user,setUser]= useState(null)
   const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        setUser(res.data)
        setLoading(false)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()

  }, [])

  return (
<>
 <Toaster position='top-right'/>
<Routes>
  
  <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
      <Navbar setUser={setUser} user={user}/>
        <Routes>
                <Route path='/' element={<Home user={user}/>} /> 
                <Route path='/builder' element={<Builder user={user} setUser={setUser}/>}/>
                <Route path='/billing' element={<Billing user={user} setUser={setUser}/>}/>
                <Route path='*' element={<Navigate to="/" replace/>}/>
        </Routes>
  </ProtectedRoute>}>
  
  </Route>
   <Route path='/login'element={<Login setUser={setUser}/>} />
</Routes>
</>
  )
}

export default App