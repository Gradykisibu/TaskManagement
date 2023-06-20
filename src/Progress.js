import React from 'react'
import ProgressPage from "./components/Progress/ProgressPage"
import ProtectedRoutes from './ProtectedRoute/ProtectedRoutes'
import { Box } from '@mui/material'

const Progress = () => {
  return (
    <Box>
      <ProtectedRoutes>
      <ProgressPage/>
      </ProtectedRoutes>
    </Box>
  )
}

export default Progress