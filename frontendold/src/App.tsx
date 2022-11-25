import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { MainPage } from "./component/main";
import { Dashboard } from "./component/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
