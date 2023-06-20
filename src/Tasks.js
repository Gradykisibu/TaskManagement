import React from 'react'
import TaksPage from './components/Tasks/TaksPage'
import ProtectedRoutes from './ProtectedRoute/ProtectedRoutes'
import { Box } from '@mui/material'

const Tasks = () => {
  return (
    <Box>
      <ProtectedRoutes>
        <TaksPage/>
      </ProtectedRoutes>
    </Box>
  )
}

export default Tasks