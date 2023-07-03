import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import "./Drawer.css";
import { AuthContext } from "../context/AuthContext";

const Drawer = () => {
  const { user, createField } = useContext(AuthContext);
  const initial = user?.email;

  return (
    <Box className="DrawerContainer">
      <Box className="initial">
        <Box  className="initialBorder">
       {initial[0]}
        </Box>
      </Box>
      <Box className="initalName">{initial}</Box>
      <Box className="Tasks">
        <h2 style={{
          marginBottom:"-10px"
        }}>Created Tasks</h2>
        <h1>{createField.length}</h1>
      </Box>
    </Box>
  );
};

export default Drawer;
