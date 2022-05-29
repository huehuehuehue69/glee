import React, { useState } from "react";
import Homescreen from "./Pages/Homescreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Description from "./Pages/Description";

function App() {
  return (
    <div className="app">
      <Router>
        {!localStorage.getItem("token") ? (
          <Landing />
        ) : (
          <Routes>
            <Route path="/" element={<Homescreen/>} />
            <Route path="/description" element={<Description/>} />
          </Routes>
          
        )}
      </Router>
    </div>
  );
}

export default App;