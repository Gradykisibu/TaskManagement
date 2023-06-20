import React, { useContext, useState } from "react";
import "./Auth.css";
import { Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SignupAuth = () => {
  const { setUser } = useContext(AuthContext);
  let history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        setUser(userCredential.user);
        history.push("/");
      })
      .catch((error) => {
        console.log(error)
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
          <br />
          <label className="label">Password</label>
          <input
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
          {loading ? "loading..." : "signup"}
        </button>
      </form>

      <Box className="forgotPassword">
        <p>Already have a TrackFit account ?</p>

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
            LOGIN
          </p>
        </Link>
      </Box>

      <Box className="signupText">
        <p>
          {" "}
          TrackFit : Work smarter, not harder the key to unlocking productivity
          potential, not only in your home but in your app!
        </p>
      </Box>
    </Box>
  );
};

export default SignupAuth;
