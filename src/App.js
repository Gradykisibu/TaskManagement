import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Tasks from "./Tasks";
import Progress from "./Progress";
import Home from "./Home";
import Navbar from "./components/Navbar/Navbar";
import RecoverPassword from "./RecoverPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/progress">
            <Progress />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgotPassword">
            <RecoverPassword/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
