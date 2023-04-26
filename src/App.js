import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import User from "./Pages/User";
import Video from "./Pages/Video";
import Home from "./Pages/Home";
import GoToVideo from "./Pages/GoToVideo";
import Test from "./Pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/user" element={<User />} /> */}
        <Route path="/video" element={<Video />} />
        <Route path="/video/detail" element={<GoToVideo />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
