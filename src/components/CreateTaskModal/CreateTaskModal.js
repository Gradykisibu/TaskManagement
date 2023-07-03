import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CreateIcon from "@mui/icons-material/Create";
import "./Modal.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 350,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function CreateTaskModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    author: "",
    content: "",
    firsttag:"",
    secondtag:"",
    thirdtag:"",
  });
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();
  const [milliSeconds, setMilliSeconds] = useState();

  const userData = { ...values, hours, minutes, seconds, milliSeconds };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (hours.length > 12 || minutes.length > 59 || seconds.length > 59 || milliSeconds.length > 59) {
      setLoading(false);
      alert("Time limit should not exceed 59");
    }else if( values.name.length < 0 || values.content.length < 0 || values.author.length < 0){
      alert("Please fill in the inputs")
    }else {
      await addDoc(collection(db, `${user.uid}`), {
        uid: user.uid,
        name: userData.name,
        author: userData.author,
        content: userData.content,
        hours: userData.hours,
        minutes: userData.minutes,
        seconds: userData.seconds,
        mseconds: userData.milliSeconds,
        firsttag: userData.firsttag,
        secondtag: userData.secondtag,
        thirdtag: userData.thirdtag,
      });
      handleClose();
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: "#551a8b", display: "flex" }}>
        <CreateIcon  fontSize="small"/>
        <p style={{ marginLeft:"5px"}}>Create Task</p>
      </Button>

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
          <Box className="formContainer">
            <form onSubmit={handleSubmit}>
              <Box className="formFields">
                <label className="label">Task Name</label>
                <input
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="input"
                  type="name"
                  name="name"
                  placeholder="Enter Field Name..."
                />
                <br />
                <label className="label">Author Name</label>
                <input
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, author: e.target.value }))
                  }
                  className="input"
                  type="name"
                  name="text"
                  placeholder="Enter Field Name..."
                />
                <br />
                <label className="label">Content</label>
                <input
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, content: e.target.value }))
                  }
                  className="input"
                  type="text"
                  name="text"
                  placeholder="Enter Field Name..."
                />
                <br />
                <label className="label">Tags</label>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    color: "white",
                    marginTop:"-10px",
                  }}
                >
                  <p>#1</p>
                  <input
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, firsttag: e.target.value }))
                    }
                    style={{ width: "70px"}}
                    className="input"
                    type="name"
                    name="name"
                    placeholder="#React"
                  />
                  <p>#2</p>
                  <input
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, secondtag: e.target.value }))
                    }
                    style={{ width: "70px"}}
                    className="input"
                    type="name"
                    name="name"
                    placeholder="#History"
                  />
                  <p>#3</p>
                  <input
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, thirdtag: e.target.value }))
                    }
                    style={{ width: "70px"}}
                    className="input"
                    type="name"
                    name="name"
                    placeholder="#Bathing"
                  />
                </Box>
                <br />
                <label className="label">Time</label>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    color: "white",
                    marginTop:"-10px",
                  }}
                >
                  <p>H:</p>
                  <input
                    maxLength={2}
                    onChange={(e) => setHours(e.target.value)}
                    style={{ width: "40px", marginLeft: "-8px" }}
                    className="input"
                    type="text"
                    name="text"
                    placeholder="00"
                  />
                  <p>M:</p>
                  <input
                    max={59}
                    maxLength={2}
                    onChange={(e) => setMinutes(e.target.value)}
                    style={{ width: "40px", marginLeft: "-8px" }}
                    className="input"
                    type="text"
                    name="text"
                    placeholder="00"
                  />
                  <p>S:</p>
                  <input
                    max={59}
                    maxLength={2}
                    onChange={(e) => setSeconds(e.target.value)}
                    style={{ width: "40px", marginLeft: "-8px" }}
                    className="input"
                    type="text"
                    name="text"
                    placeholder="00"
                  />
                  <p>MS:</p>
                  <input
                    maxLength={2}
                    max={59}
                    onChange={(e) => setMilliSeconds(e.target.value)}
                    style={{ width: "40px", marginLeft: "-8px" }}
                    className="input"
                    type="text"
                    name="text"
                    placeholder="00"
                  />
                </Box>
                <button type="submit" className="addButton">
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
