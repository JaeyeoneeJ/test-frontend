import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>HOME</h1>
      {/* <button onClick={() => navigate("/user")}>Go to User Page</button> */}
      <button onClick={() => navigate("/video")}>Go to Video Page</button>
    </>
  );
};

export default Home;
