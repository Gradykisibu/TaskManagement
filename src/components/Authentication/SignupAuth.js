import React, { useContext, useState } from "react";
import "./Auth.css";
import { Box } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const SignupAuth = () => {
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
      .then(async (res) => {
        const user = res.user;
        console.log(user);

        await addDoc(collection(db, "users").setDoc(res.user.uid),{
          uid: user.uid,
          email: user.email,
        });

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
