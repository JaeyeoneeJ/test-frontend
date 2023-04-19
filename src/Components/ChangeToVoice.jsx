import axios from "axios";
import React, { useRef, useState } from "react";

const ChangeToVoice = ({ onClickTitle }) => {
  const [chooseLanguage, setChooseLanguage] = useState();
  const [voiceUrl, setVoiceUrl] = useState();
  console.log("voiceUrl: ", voiceUrl);

  const voiceAudioRef = useRef(null);

  const getVoice = async () => {
    if (!onClickTitle) {
      return alert(
        "지정된 타이틀 값이 존재하지 않아 API를 호출할 수 없습니다."
      );
    } else if (!chooseLanguage) {
      return alert("언어를 선택하지 않아 API를 호출할 수 없습니다.");
    }

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/video/${onClickTitle}/${chooseLanguage}`
      );
      console.log("언어 선택 호출 결과: ", data);
      setVoiceUrl(data);
    } catch (e) {
      console.log(e);
    }
  };

  //   useEffect(() => {
  //     if (
  //       voiceUrl &&
  //       voiceAudioRef.current &&
  //       voiceAudioRef.current !== null &&
  //       voiceAudioRef.current !== undefined
  //     ) {
  //       voiceAudioRef.current.play();
  //     }
  //   }, [voiceAudioRef, getVoice]);

  return (
    <>
      <h3>언어 선택 버튼</h3>
      <button onClick={getVoice}>나를 누르면 언어를 불러온다!</button>
      <p>내가 선택한 영상: {onClickTitle}</p>
      <p>내가 선택한 언어: {chooseLanguage}</p>
      <button onClick={() => setChooseLanguage("ko")}>한국어</button>
      <button onClick={() => setChooseLanguage("en")}>영어</button>
      <button onClick={() => setChooseLanguage("thai")}>태국어</button>
      <button onClick={() => setChooseLanguage("bg")}>배경음악</button>
      <br />
      <audio controls ref={voiceAudioRef} src={voiceUrl} />
    </>
  );
};

export default ChangeToVoice;
