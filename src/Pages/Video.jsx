import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxExternalLink } from "react-icons/rx";
import { useSetRecoilState } from "recoil";
import { videoInfoAtom } from "../recoil/atoms/atoms";

const Video = () => {
  const navigate = useNavigate();
  const [videoList, setVideoList] = useState([]);
  const [onClickTitle, setOnClickTitle] = useState();
  console.log("videoList: ", videoList);
  console.log("onClickTitle: ", onClickTitle);

  const setVideoInfo = useSetRecoilState(videoInfoAtom);

  //   const videoRef = useRef(null);
  // const [url, setUrl] = useState(null);
  // const [imgUrl, setImgUrl] = useState("");
  // console.log("url: ", url);
  // console.log("imgUrl: ", imgUrl);

  // const getVideoApi = async () => {
  //   try {
  //     console.log("비디오 요청");
  //     const { data } = await axios.get(`${process.env.REACT_APP_URL}/video`);
  //     console.log("비디오 요청 완료: ", data);

  //     setUrl(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const getObjectStorage = async () => {
  //   try {
  //     const data = await axios.get(
  //       `${BASE_URL}/${title}/${title}_thumbnail.jpeg`
  //     );
  //     console.log("img data: ", data);
  //     setImgUrl(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const getSelectAll = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/video`);
      console.log(data);
      setVideoList(data);
    } catch (e) {
      console.log(e);
    }
  };

  const goToVideo = async (info) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/video/${info.title}`
      );
      setVideoInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSelectAll();
  }, []);

  return (
    <>
      <h1>Video List</h1>
      <table>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Video</th>
            <th style={{ padding: "10px" }}>Voice Kr</th>
            <th style={{ padding: "10px" }}>Voice En</th>
            <th style={{ padding: "10px" }}>Voice Thai</th>
            <th style={{ padding: "10px" }}>BG</th>
            <th style={{ padding: "10px" }}>Go To Video</th>
          </tr>
        </thead>
        <tbody>
          {videoList?.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {item.id}
              </td>
              <td
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={() => {
                  setOnClickTitle(item.title);
                  alert(`${item.title}가 title로 지정되었습니다.`);
                }}
              >
                {item.title}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {item.video ? "O" : "X"}
              </td>
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
              <td
                style={{
                  padding: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  goToVideo(item);
                  navigate("/video/detail");
                }}
              >
                <RxExternalLink />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Video;
