import React from 'react'
import Main from './components/Main/Main'
import { Box } from '@mui/material'
import ProtectedRoutes from "./ProtectedRoute/ProtectedRoutes"


const Home = () => {
  return (
    <Box>
      <ProtectedRoutes>
      <Main/>
      </ProtectedRoutes>
    </Box>
  )
}

export default Home