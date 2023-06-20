import React from 'react'
import { Box } from "@mui/material"
import SignupAuth from './components/Authentication/SignupAuth'
import './App.css'

const Signup =() => {
  return (
    <Box className="signUpBackgroundImage">
      <SignupAuth/>
    </Box>
  )
}

export default Signup