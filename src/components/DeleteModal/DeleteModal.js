import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CreateIcon from "@mui/icons-material/Create";
import './DeleteModal.css'
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext } from "react";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height:270,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display:"flex",
  flexDirection:"column",
};

export default function DeleteModal(field) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {  user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const TaskName = field.field.field.name;
  const TaskId = field.field.field;
  const id = TaskId.id

  const deleteBooking = async () => {
    await deleteDoc(doc(db, `${user.uid}`,id))
  }



  return (
    <div>
      <p onClick={handleOpen}>
        Delete
      </p>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="formContainer">
           <h2>Confirm To Delete Task</h2>
           <p style={{fontSize:"20px", fontWeight:"bold"}}>{TaskName}</p>
          </Box>

          <Box className="buttonContainer">
            <button onClick={() => deleteBooking()} className="button" style={{background:"green"}}>Delete</button>

            <button onClick={handleClose} className="button" style={{background:"red"}}>Close</button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
