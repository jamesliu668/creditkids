import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

const App = () => {
  return (
    <Router>
      <Routes> {/* Replaces Switch */}
      <Route path="/" element={<UserList />} /> {/* Use element instead of component */}
        <Route path="/user/:userId" element={<UserDetail />} /> {/* Use element instead of component */}
      </Routes>
    </Router>
  );
};

export default App;
