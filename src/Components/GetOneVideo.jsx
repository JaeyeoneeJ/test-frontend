import React from "react";

const GetOneVideo = ({ item }) => {
  return !item ? (
    <div>버튼을 클릭하면 클릭한 영상 정보를 가져옵니다.</div>
  ) : (
    <>
      <h1>One Video</h1>
      <table>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Voice Kr</th>
            <th style={{ padding: "10px" }}>Voice En</th>
            <th style={{ padding: "10px" }}>Voice Thai</th>
            <th style={{ padding: "10px" }}>BG</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", textAlign: "center" }}>{item.id}</td>
            <td style={{ padding: "10px", cursor: "pointer" }}>{item.title}</td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {item.voiceKr ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {item.voiceEn ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {item.voiceThai ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {item.bg ? "O" : "X"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GetOneVideo;
