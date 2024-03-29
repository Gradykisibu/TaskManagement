import React from 'react'
import Main from './components/Main/Main'
import { Box } from '@mui/material'
import ProtectedRoutes from "./ProtectedRoute/ProtectedRoutes"
import './App.css'

const Home = () => {

  React.useEffect(() => {
    document.title = "TrackFit | Home"
 }, []);

  return (
    <Box className="HomeBackgroundImage">
      <ProtectedRoutes>
      <Main/>
      </ProtectedRoutes>
    </Box>
  )
}

export default Home