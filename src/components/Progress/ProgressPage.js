import React, { useContext, useState } from "react";
import Drawer from "../SideDrawer/Drawer";
import { Box } from "@mui/material";
import "./Progress.css";
import { AuthContext } from "../context/AuthContext";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const Progress = () => {
  const {
    createField,
    setCreateField,
    user,
    newHour,
    newMinute,
    newSeconds,
    running,
  } = useContext(AuthContext);

  console.log(newHour, newMinute, newSeconds, "Lapping Time");

  React.useEffect(() => {
    const q = query(collection(db, `${user.uid}`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let fieldArray = [];
      querySnapshot.forEach((doc) => {
        fieldArray.push({ ...doc.data(), id: doc.id });
      });
      setCreateField(fieldArray);
    });
    return () => unsub();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Drawer />
      <Box className="BackgroundImage">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box className="progressTasksFieldContainer">
            {createField.map((field, index) => {
              return (
                <Box key={index}>
                  <Box className="progressFieldCard">
                    <Box
                      sx={{
                        display: "flex",
                        width: "80%",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        marginLeft: "30px",
                      }}
                    >
                      <Box className="fieldName">{field.name}</Box>
                    </Box>

                    <Box className="progressField">
                      {field.hours == "00" &&
                      field.minutes == "00" &&
                      field.seconds == "0" ? (
                        <p style={{ color: "green" }}>
                          CONGRATULATIONS TASK COMPLETED
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>REMAINING TIME</p>
                      )}
                      <Box
                        sx={{
                          fontWeight: "bold",
                          paddingRight: "15px",
                          fontFamily: "sans-serif",
                          fontSize: "20px",
                        }}
                      >
                        {field.hours}:{field.minutes}:{field.seconds}:
                        {field.mseconds}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Progress;
