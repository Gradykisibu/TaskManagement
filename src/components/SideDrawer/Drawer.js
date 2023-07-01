import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import "./Drawer.css";
import { AuthContext } from "../context/AuthContext";

const Drawer = () => {
  const { user, createField } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const initial = user?.email;

  return (
    <Box className="DrawerContainer">
      <Box className="initial">
        <Box  className="initialBorder">
      {/* {initial[0]} */}
        </Box>
      </Box>
      <Box className="initalName">{initial}</Box>
      <Box className="Tasks">
        <p>Created Tasks : {createField.length}</p>
        <p>Task in Progress: {count}</p>
      </Box>
    </Box>
  );
};

export default Drawer;
