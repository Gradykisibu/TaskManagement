import React from 'react'
import ProgressPage from "./components/Progress/ProgressPage"
import ProtectedRoutes from './ProtectedRoute/ProtectedRoutes'
import { Box } from '@mui/material'
import './App.css'

const Progress = () => {
  return (
    <Box className="HomeBackgroundImage">
      <ProtectedRoutes>
      <ProgressPage/>
      </ProtectedRoutes>
    </Box>
  )
}

export default Progress