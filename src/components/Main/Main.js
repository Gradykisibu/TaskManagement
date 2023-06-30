import React from "react";
import { Box } from "@mui/material";
import "./Main.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Main = () => {
  return (
    <Box className="HomeContainer">
      <Box className="firstContainer">
        <Box className="firstContainerHeading">
          <h1>Manage Your Time Easily With TrackFit</h1>
          <h1>Manage Your Time Easily With TrackFit</h1>
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "100px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box className="SecondContainerHeading">
            <p>
              As a TrackFit company, we will give you the easiest way to manage
              your day to day activities...
            </p>
            <p>
              As a TrackFit company, we will give you the easiest way to manage
              your day to day activities...
            </p>
          </Box>

          <Link to='createTask' className="createTaskbuttonlink">
            <Box
              sx={{
                width: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                mt: "50px",
              }}
            >
              <button className="createTaskbutton">Create Task</button>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
