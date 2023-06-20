import React, { useContext} from 'react'
import { AuthContext } from '../context/AuthContext'


const Main = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div>Home</div>
  )
}

export default Main