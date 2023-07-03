import React, { useContext, useState, useEffect } from "react";
import Drawer from "../SideDrawer/Drawer";
import { Box } from "@mui/material";
import "./Progress.css";
import { AuthContext } from "../context/AuthContext";
import { query, collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Progress = () => {
  const {
    createField,
    setCreateField,
    user,
  } = useContext(AuthContext);
  const [ searchTerm, setSearchTerm ] = useState("");

  useEffect(() => {
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


  const handlePushToEnd = () => {
    let Data = createField
    for (let i = 0; i < Data.length; i++) {
      const element = Data[0];
      if(
        element.hours == "00" &&
        element.minutes == "00" &&
        element.seconds == "0" &&
        element.mseconds == "0" ||
        element.hours == "00" &&
        element.minutes == "00" &&
        element.seconds == "00" &&
        element.mseconds == "00"){
          createField.shift(element);
          createField.push(element);
          handleUpdateDocument(element)
        }
    }
  }

  const handleUpdateDocument = (element) => {
    const dataId = element.id
    const documentRef = doc(db, `${user.uid}`, dataId);
    const updatedData = {
      uid: user.uid,
      name: element.name,
      content: element.content,
      author: element.author,
      hours: element.hours,
      minutes: element.minutes,
      seconds: element.seconds,
      mseconds: element.mseconds,
      firsttag: element.firsttag,
      secondtag: element.secondtag,
      thirdtag: element.thirdtag,
    };
    updateDocument(documentRef, updatedData);
  };

  const updateDocument = async (documentRef, updatedData) => {
    try {
      await setDoc(documentRef, updatedData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };


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
          <Box className="SearchInput">
            <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search #Tags" className="progressInput" />
          </Box>

          

          <Box className="progressTasksFieldContainer">
            {createField.filter((field) => {
              if(searchTerm == ""){
                return field
              }else if(field.firsttag.toLowerCase().includes(searchTerm.toLowerCase())){
                return field
              }else if(field.secondtag.toLowerCase().includes(searchTerm.toLowerCase())){
                return field
              }else if(field.thirdtag.toLowerCase().includes(searchTerm.toLowerCase())){
                return field
              }
            })
            .map((field, index) => {
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
                       field.seconds == "0" &&
                       field.mseconds == "0" ||
                       field.hours == "00" &&
                       field.minutes == "00" &&
                       field.seconds == "00" &&
                       field.mseconds == "00" ?
                       (
                        <p style={{ color: "green" }}>
                          CONGRATULATIONS TASK COMPLETED
                        </p>
                      ) : (
                        handlePushToEnd(),
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
                      <Box>
                        {
                        field.firsttag && field.secondtag && field.thirdtag ? <p>{field.firsttag} - {field.secondtag} - {field.thirdtag}</p> : ""
                        }
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
