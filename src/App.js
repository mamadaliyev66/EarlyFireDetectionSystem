import { Home } from "./components/home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import React, { Component } from "react";
import { Dashboard } from "./components/dashboard";
import Auth from "./components/auth";
import Register from "./components/register";
import CameraDetails from "./components/dashboard/CameraDetails";
function App() {
  return (
    <Router>
    <div className="App">
        
        <Routes>
            <Route
                exact
                path="/"
                element={<Home />}
            ></Route>
            <Route
                exact
                path="/login"
                element={<Auth />}
            ></Route>
            <Route
                exact
                path="/dashboard"
                element={<Dashboard />}
            ></Route>
            <Route
                exact
                path="/register"
                element={<Register />}
            ></Route>
            <Route path="/camera-details/:camera_name" element={<CameraDetails />} />

        </Routes>
    </div>
</Router>
  );
}

export default App;
