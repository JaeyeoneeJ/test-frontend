import React, { useState } from "react";
import GetSearchUser from "../Components/GetSearchUser";
import UserList from "../Components/UserList";
import SignUpModal from "../Components/SignUpModal";

function User() {
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

export default User;
