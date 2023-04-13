import React, { useState } from "react";
import GetSearchUser from "./Pages/GetSearchUser";
import UserList from "./Pages/UserList";
import SignUpModal from "./Pages/SignUpModal";

function App() {
  const [onSignUp, setOnSignUp] = useState(false);
  const [userList, setUserList] = useState([]);
  console.log(process.env.REACT_APP_URL);

  return (
    <>
      <h1>Naver Cloud Platform 연동</h1>
      <button onClick={() => setOnSignUp(true)}>Sign Up</button>
      {onSignUp && (
        <SignUpModal
          userList={userList}
          setUserList={setUserList}
          setOnSignUp={setOnSignUp}
        />
      )}
      <GetSearchUser />
      <UserList userList={userList} setUserList={setUserList} />
    </>
  );
}

export default App;
