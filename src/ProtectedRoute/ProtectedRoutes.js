import { useContext } from 'react'
import { AuthContext } from '../components/context/AuthContext';
import { useHistory } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    let history = useHistory();
    const { user } = useContext(AuthContext);

    if(user == null){
     history.push('/signup')
    }
  return children;
}

export default ProtectedRoutes;