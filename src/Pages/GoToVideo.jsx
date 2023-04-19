import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoInfoAtom } from "../recoil/atoms/atoms";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../Components/DropdownButton";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;
const Title = styled.h1`
  text-align: center;
`;
const SubTitle = styled.h2`
  margin-top: 50px;
  text-align: center;
`;
const Table = styled.table`
  margin: 0 auto;
`;
const VideoPlayer = styled.video``;

const GoToVideo = () => {
  // vercel 배포용
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const bgRef = useRef(null);
  const voiceRef = useRef(null);
  const [voiceUrl, setVoiceUrl] = useState();
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  console.log("재생 위치: ", videoCurrentTime);
  console.log("voiceUrl: ", voiceUrl);
  const videoInfo = useRecoilValue(videoInfoAtom);
  console.log("videoInfo: ", videoInfo);

  const handleVideoPause = () => {
    bgRef.current.pause();
    voiceRef.current.pause();
    setVideoCurrentTime(videoRef.current?.currentTime);
  };

  const handleVideoPlay = () => {
    bgRef.current.pause();
    voiceRef.current.pause();
    bgRef.current.currentTime = videoRef.current?.currentTime;
    voiceRef.current.currentTime = videoRef.current?.currentTime;
    bgRef.current.play();
    voiceRef.current.play();
    setVideoCurrentTime(videoRef.current?.currentTime);
  };

  useEffect(() => {
    // defaultLanguage 주입
    !voiceUrl &&
      videoInfo &&
      setVoiceUrl(
        `${process.env.REACT_APP_URL_S3}/${videoInfo.title}/${videoInfo.voiceKr}`
      );
    if (voiceUrl && videoInfo) {
      voiceRef.current.currentTime = videoRef.current?.currentTime;
    }
  }, [videoInfo, voiceUrl]);

  useEffect(() => {
    if (
      videoInfo &&
      videoRef.current &&
      videoRef.current !== null &&
      videoRef.current !== undefined
    ) {
      videoRef.current.pause();
      videoRef.current.play();
      setVideoCurrentTime(videoRef.current.currentTime);
    }
  }, [videoInfo, videoRef]);

  useEffect(() => {
    if (
      videoInfo &&
      bgRef.current &&
      bgRef.current !== null &&
      bgRef.current !== undefined &&
      videoRef.current.play()
    ) {
      bgRef.current.pause();
      bgRef.current.play();
    }
  }, [videoInfo, videoRef, bgRef]);

  useEffect(() => {
    if (
      videoInfo &&
      voiceUrl &&
      voiceRef.current &&
      voiceRef.current !== null &&
      voiceRef.current !== undefined &&
      videoRef.current.play()
    ) {
      voiceRef.current.pause();
      voiceRef.current.play();
    }
  }, [voiceUrl, videoInfo, videoRef, voiceRef]);

  return videoInfo ? (
    <Wrapper>
      <Title>Title: {videoInfo.title}</Title>
      <Table>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Video</th>
            <th style={{ padding: "10px" }}>Voice Kr</th>
            <th style={{ padding: "10px" }}>Voice En</th>
            <th style={{ padding: "10px" }}>Voice Thai</th>
            <th style={{ padding: "10px" }}>BG</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.id}
            </td>
            <td style={{ padding: "10px", cursor: "pointer" }}>
              {videoInfo.title}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.video ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.voiceKr ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.voiceEn ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.voiceThai ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.bg ? "O" : "X"}
            </td>
          </tr>
        </tbody>
      </Table>
      <SubTitle>Player</SubTitle>
      <VideoPlayer
        ref={videoRef}
        controls
        src={`${process.env.REACT_APP_URL_S3}/${videoInfo.title}/${videoInfo.video}`}
        width={640}
        height={"auto"}
        muted
        onPause={handleVideoPause}
        onPlay={handleVideoPlay}
      />
      {/* choose to Language */}
      <DropdownButton
        options={["ko", "en", "thai"]}
        defaultLanguage={"ko"}
        setVoiceUrl={setVoiceUrl}
        videoInfo={videoInfo}
      />
      {/* background music */}
      <div>
        <audio
          controls
          ref={bgRef}
          src={`${process.env.REACT_APP_URL_S3}/${videoInfo.title}/${videoInfo.bg}`}
        />
        <audio controls ref={voiceRef} src={voiceUrl} />
      </div>
    </Wrapper>
  ) : (
    <>
      <div>영상 정보를 찾을 수 없습니다. 다시 선택해주세요.</div>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </>
  );
};

export default GoToVideo;
