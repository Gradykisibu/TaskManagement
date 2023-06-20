import { createContext, useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [ userData, setUserData ] = useState()

  useEffect(() => {
   onAuthStateChanged(auth, (data) => {
      setUserData(data);
    });
  }, []);

const payload = {
    user,
    setUser,
    userData,
    setUserData
}

  return (
   <AuthContext.Provider value={payload}>
    {children}
    </AuthContext.Provider>
   )
};

export default AuthProvider;