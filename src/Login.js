import React from 'react'
import LoginAuth from './components/Authentication/LoginAuth'
import { Box } from '@mui/material'
import './App.css'

const Login = () => {
  return (
    <Box className="signUpBackgroundImage">
      <LoginAuth/>
    </Box>
  )
}

export default Login