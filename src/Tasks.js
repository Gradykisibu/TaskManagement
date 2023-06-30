import React from 'react'
import TaksPage from './components/Tasks/TaksPage'
import ProtectedRoutes from './ProtectedRoute/ProtectedRoutes'
import { Box } from '@mui/material'
import './App.css'

const Tasks = () => {
  return (
    <Box className="HomeBackgroundImage">
      <ProtectedRoutes>
        <TaksPage/>
      </ProtectedRoutes>
    </Box>
  )
}

export default Tasks