import React, { useState } from "react";
import { Box } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ForgotPassword = () => {
  let history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        alert("An Email has been sent your account!");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className="signupContainer">
      <form onSubmit={handleSubmit}>
        <Box className="formContainer">
          <label className="label">Email</label>
          <input
            placeholder="Email..."
            type="email"
            name="email"
            value={values.email}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
            className="input"
          />
        </Box>
        <button disabled={loading} className="submitButton" type="submit">
          {loading ? "loading..." : "submit"}
        </button>
      </form>

      <Box className="forgotPassword">
        <p>Remember your password ?</p>
        <Link to="login">
          <p
            style={{
              marginLeft: "5px",
              textDecoration: "underline",
              fontWeight: "lighter",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            login
          </p>
        </Link>
      </Box>

      <Box className="signupText">
        <p>
          {" "}
          TrackFit : Please remember to store your password somewhere that you
          could remember
        </p>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
