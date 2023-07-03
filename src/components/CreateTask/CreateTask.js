import React, { useContext } from "react";
import Drawer from "../SideDrawer/Drawer";
import { Box } from "@mui/material";
import "./CreateTask.css";
import BasicModal from "../CreateTaskModal/CreateTaskModal";
import { AuthContext } from "../context/AuthContext";
import "swiper/css";
import "swiper/css/pagination";
import BasicMenu from "../DeleteTaskMenu/DeleteTask";

import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import RunTimeModal from "../RunTimeModal/RunTimeModal";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";

const CreateTask = () => {
  const { createField, setCreateField, user } = useContext(AuthContext);

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
          <Box className="createFieldText">
            <p>
              <CreateTaskModal />
            </p>
          </Box>

          <Box className="createdTasksFieldContainer">
            {createField.map((field, index) => {
              return (
                <Box key={index}>
                  <Box className="createdFieldCard">
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
                      <BasicMenu field={field} />
                    </Box>

                    {(field.hours == "00" &&
                      field.minutes == "00" &&
                      field.seconds == "0" &&
                      field.mseconds == "0") ||
                    (field.hours == "00" &&
                      field.minutes == "00" &&
                      field.seconds == "00" &&
                      field.mseconds == "00") ? (
                      <Box
                        sx={{
                          backgroundImage: `url("https://img1.picmix.com/output/stamp/normal/7/4/3/4/534347_0e653.gif")`,
                        }}
                        className="TaskField"
                      >
                        <p
                          style={{
                            fontWeight: "bold",
                            marginLeft: "-15px",
                            textTransform: "uppercase",
                            color: "transparent",
                          }}
                        >
                          {field.author}
                        </p>

                        <Box
                          sx={{
                            fontWeight: "bold",
                            paddingRight: "15px",
                            fontFamily: "sans-serif",
                            fontSize: "20px",
                            color: "green",
                          }}
                        >
                          <p>COMPLETED</p>
                        </Box>

                        <p
                          style={{
                            fontWeight: "lighter",
                            color: "transparent",
                          }}
                        >
                          {field.content}
                        </p>
                      </Box>
                    ) : (
                      <Box className="TaskField">
                        <p
                          style={{
                            fontWeight: "bold",
                            marginLeft: "-15px",
                            textTransform: "uppercase",
                          }}
                        >
                          {field.author}
                        </p>

                        <Box
                          sx={{
                            fontWeight: "bold",
                            paddingRight: "15px",
                            fontFamily: "sans-serif",
                            fontSize: "20px",
                          }}
                        >
                          <p>
                            {" "}
                            {field.hours}:{field.minutes}:{field.seconds}:
                            {field.mseconds}
                          </p>
                        </Box>

                        <p style={{ fontWeight: "lighter" }}>{field.content}</p>
                      </Box>
                    )}

                    <Box sx={{ width: "100%" }}>
                      <RunTimeModal time={field} />
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

export default CreateTask;
