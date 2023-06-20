import React, { useContext } from "react";
import "./Navbar.css";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
let history = useHistory();
const { user, setUser } = useContext(AuthContext);

const handleSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    setUser(null)
    history.push('/login')
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}

const handleLogin = () => {
  history.push('/login');
}

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="NavbarContainer">
        <img src="/Logo.png" alt="logo" className="logo"/>

        <Box className="NavbarLinks">
          <Link to="/" className="AnchorLink">
            <p className="bannerLink">HOME</p>
          </Link>
          <Link to="tasks" className="AnchorLink">
            <p className="bannerLink">TASKS</p>
          </Link>
          <Link to="progress" className="AnchorLink">
            <p className="bannerLink">PROGRESS</p>
          </Link>
        </Box>

        <Box
         className="loginLogout"
        >
          {
            user ? <p onClick={() => handleSignOut()}>Logout</p> : <p onClick={() => handleLogin()}>Login</p>
          }
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
