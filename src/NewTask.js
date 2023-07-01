import { Box } from '@mui/material'
import React from 'react'
import CreateTask from './components/CreateTask/CreateTask'
import ProtectedRoutes from './ProtectedRoute/ProtectedRoutes'
import './App.css'

const NewTask = () => {

  React.useEffect(() => {
    document.title = "TrackFit | Create Task"
 }, []);


  return (
    <Box className="HomeBackgroundImage">
        <ProtectedRoutes>
        <CreateTask/>
        </ProtectedRoutes>
    </Box>
  )
}

export default NewTask