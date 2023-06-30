import React, { useContext, useState } from "react";
import "./Auth.css";
import { Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LoginAuth = () => {

  let history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async(res) => {
        const user = res.user;
        console.log(user)
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Box className="signupContainer">
      <form onSubmit={handleSubmit}>
        <Box className="formContainer">
          <label className="label">Email</label>
          <input
          required
            placeholder="Email..."
            type="email"
            name="email"
            value={values.email}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
            className="input"
          />
          <br />
          <label className="label">Password</label>
          <input
          required
            placeholder="Password..."
            type="password"
            name="password"
            value={values.password}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, password: e.target.value }))
            }
            className="input"
          />
        </Box>
        <button disabled={loading} className="submitButton" type="submit">
          {loading ? "loading..." : "login"}
        </button>
      </form>

      <Box
        sx={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          width: "100%",
          marginBottom: "-50px",
        }}
      >
        <Box className="forgotPassword">
          <p>Forgot Your Password ?</p>
          <Link to="forgotPassword">
            <p
              style={{
                marginLeft: "5px",
                textDecoration: "underline",
                fontWeight: "lighter",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              recover
            </p>
          </Link>
        </Box>
        <Box className="donthaveaccount">
          <p>Dont have a TrackFit account ?</p>
          <Link to="signup">
            <p
              style={{
                marginLeft: "5px",
                textDecoration: "underline",
                fontWeight: "lighter",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              SIGNUP
            </p>
          </Link>
        </Box>
      </Box>

      <Box className="signupText">
        <p>
          {" "}
          TrackFit : Welcome back, get ready to track down your time and manage
          your workflow!
        </p>
      </Box>
    </Box>
  );
};

export default LoginAuth;
