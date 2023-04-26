import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoInfoAtom } from "../recoil/atoms/atoms";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../Components/DropdownButton";
import ReactPlayer from "react-player";

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
const DivCenter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const GoToVideo = () => {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const voiceRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState();
  const [voiceUrl, setVoiceUrl] = useState();
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  console.log("재생 위치: ", videoCurrentTime);

  const videoInfo = useRecoilValue(videoInfoAtom);

  const [playing, setPlaying] = useState(false);
  console.log("voiceRef playing status: ", playing);

  const handleVideoPause = () => {
    setPlaying(false);
    videoRef.current?.getInternalPlayer()?.pause();
    voiceRef.current?.getInternalPlayer()?.pause();
  };

  const handleVideoPlay = () => {
    setPlaying(true);
    videoRef.current?.getInternalPlayer()?.play();
    voiceRef.current?.getInternalPlayer()?.play();
  };

  useEffect(() => {
    videoInfo &&
      setVideoUrl(
        `${process.env.REACT_APP_URL_S3}/${videoInfo.title}/streamingFile/video/${videoInfo.title}.m3u8`
      );
  }, [videoInfo]);

  useEffect(() => {
    // defaultLanguage 주입
    if (!voiceUrl && videoInfo) {
      setVoiceUrl(
        `${process.env.REACT_APP_URL_S3}/${videoInfo.title}/streamingFile/ko/${videoInfo.title}_ko.m3u8`
      );
    }
  }, [videoInfo, voiceUrl, videoUrl]);

  useEffect(() => {
    voiceRef.current && voiceRef.current?.getCurrentTime(0);
  }, [voiceRef.current]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = videoRef.current?.getCurrentTime();
      console.log("currentTime: ", currentTime);

      if (currentTime !== null) {
        console.log("seek To ing...");
        voiceRef.current?.seekTo(currentTime);
      }
    };

    videoRef.current
      ?.getInternalPlayer()
      ?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoRef.current
        ?.getInternalPlayer()
        ?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef.current, voiceRef.current]);

  return videoInfo ? (
    <Wrapper>
      <Title>Title: {videoInfo.title}</Title>
      <Table>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Video</th>
            <th style={{ padding: "10px" }}>Voice Ko</th>
            <th style={{ padding: "10px" }}>Voice En</th>
            <th style={{ padding: "10px" }}>Voice Thai</th>
            <th style={{ padding: "10px" }}>BGM</th>
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
              {videoInfo.voiceKo ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.voiceEn ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.voiceThai ? "O" : "X"}
            </td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              {videoInfo.bgm ? "O" : "X"}
            </td>
          </tr>
        </tbody>
      </Table>
      <SubTitle>Player</SubTitle>
      <DivCenter>
        <ReactPlayer
          ref={videoRef}
          controls
          url={videoUrl}
          width={640}
          height={"auto"}
          muted
          playing={playing}
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
        <ReactPlayer
          height={50}
          ref={voiceRef}
          controls
          url={voiceUrl}
          playing={playing}
        />
      </DivCenter>
    </Wrapper>
  ) : (
    <>
      <div>영상 정보를 찾을 수 없습니다. 다시 선택해주세요.</div>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </>
  );
};

export default GoToVideo;
