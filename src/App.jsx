import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookmark from "./pages/Bookmark";
import UserStory from "./components/CategoryCard/UserStory";
import GetStory from "./components/GetStory";
function App() {

  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/userstory" element={<UserStory />} />
          <Route path="/getStory/:storyId" element={<GetStory />} />
        </Routes>
      </Router>

      <Toaster />
    </div>
  );
}

export default App;
