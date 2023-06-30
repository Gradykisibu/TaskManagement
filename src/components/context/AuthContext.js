import { createContext, useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [createField, setCreateField] = useState([]);
  const [newHour, setNewHour] = useState();
  const [newMinute, setNewMinute] = useState();
  const [newSeconds, setNewSeconds] = useState();
  const [ running , setRunning ] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
  }, []);

  const payload = {
    user,
    setUser,
    createField,
    setCreateField,
    newHour,
    setNewHour,
    newMinute,
    setNewMinute,
    newSeconds,
    setNewSeconds,
    running, 
    setRunning,
  };

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
