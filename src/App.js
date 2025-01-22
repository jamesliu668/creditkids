import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserDetail from "./components/UserDetail";

const App = () => {
  return (
    <Router>
      <Routes> {/* Replaces Switch */}
      <Route path="/" element={<HomePage />} /> {/* Use element instead of component */}
        <Route path="/user/:userId" element={<UserDetail />} /> {/* Use element instead of component */}
      </Routes>
    </Router>
  );
};

export default App;
