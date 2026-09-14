import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
// import Button from './modules/employer/components/Button'
import NavBarLinks from './modules/employer/components/EmployerNavBar'
// import { Footer } from './modules/employer/components/Footer'
import { Route, Routes } from 'react-router-dom'
import EmployerHome from './modules/employer/pages/EmployerHome'
import { UserContext, UserProvider } from './context/UsersContext'
import { JobProvider } from './context/JobContext'
import { AppRoutes } from './app/routes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <UserProvider>
         <JobProvider>
           <AppRoutes/>
         </JobProvider>
        </UserProvider>
    </>
  )
}

export default App
