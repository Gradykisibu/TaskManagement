import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./AddTaskModal.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RunTimeModal({ time }) {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { setNewHour, setNewMinute, setNewSeconds, running, setRunning, user } =
    useContext(AuthContext);

  let hour = time.hours;
  let minute = time.minutes;
  let second = time.seconds;
  let mseconds = time.mseconds;

  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);
  const [milliSeconds, setMilliSeconds] = useState(mseconds);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        if (milliSeconds > 0) {
          setMilliSeconds((milliSeconds) => milliSeconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliSeconds(59);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliSeconds(59);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setSeconds(59);
          setMinutes(59);
          setMilliSeconds(59);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [milliSeconds, seconds, minutes, hours, running]);

  useEffect(() => {
    setNewHour(hours);
    setNewMinute(minutes);
    setNewSeconds(seconds);
  });

  //Start Time Function
  const handlStartTime = () => {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliSeconds !== 0) {
      setRunning(true);
    } else {
      alert("No Time Available");
    }
  };

  //Pause Time Function
  const handlePauseTime = () => {
    setRunning(false);
    handleUpdateDocument();
  };

  const handleSave = () => {
    setLoading(true);
    handleUpdateDocument();
    setTimeout(() => {
      history.push("/progress");
    }, 5000);
  };

  const id = time.id;
  const handleUpdateDocument = () => {
    const documentRef = doc(db, `${user.uid}`, id);
    const updatedData = {
      uid: user.uid,
      name: time.name,
      content: time.content,
      author: time.author,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      mseconds: milliSeconds,
      firsttag: time.firsttag,
      secondtag: time.secondtag,
      thirdtag: time.thirdtag,
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
    <div>
      <button onClick={handleOpen} className="addTaskButton">
        Run Time
      </button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="cancelButton" onClick={handleClose}>
            <CancelIcon
              sx={{
                color: "red",
                justifyContent: "flex-end",
                fontSize: "30px",
                cursor: "pointer",
              }}
            />
          </Box>
          <br />
          <Box className="AddTasformContainer">
            <Box>
              <h1>Time CountDown</h1>
            </Box>
            <Box sx={{ fontSize: "30px" }}>
              {hours}:{minutes}:{seconds}:{milliSeconds}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
                marginTop: "50px",
              }}
            >
              <button className="timebutton" onClick={handlePauseTime}>
                STOP
              </button>
              <button
                disabled={loading}
                className="timebutton"
                onClick={handleSave}
              >
                {loading ? "SAVING..." : "SAVE"}
              </button>
              <button className="timebutton" onClick={handlStartTime}>
                START
              </button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
