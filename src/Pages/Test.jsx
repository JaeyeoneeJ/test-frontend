import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const Test = () => {
  // const title = "my_love_from_the_star";
  const title = "extraordinary_attorney_woo";
  const [apiUrl, setApiUrl] = useState();

  const videoRef = useRef(null);
  const [url, setUrl] = useState();
  console.log(videoRef.current?.src);
  console.log("url: ", url);

  const testApi = async () => {
    try {
      const { data } = await axios.get(apiUrl);
      console.log("data: ", data);
      setUrl(data);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   testApi();
  // }, []);

  return (
    <>
      <div>
        <span>설정 저장: </span>
        <span>{apiUrl}</span>
        <div>
          <h4>우영우</h4>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/extraordinary_attorney_woo/video`
              )
            }
          >
            우영우 video .m3u8 변환
          </button>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/extraordinary_attorney_woo/language/ko`
              )
            }
          >
            우영우 한국어 .m3u8 변환
          </button>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/extraordinary_attorney_woo/language/en`
              )
            }
          >
            우영우 영어 .m3u8 변환
          </button>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/extraordinary_attorney_woo/language/thai`
              )
            }
          >
            우영우 태국어 .m3u8 변환
          </button>
        </div>
        <div>
          <h4>별그대</h4>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/my_love_from_the_star/video`
              )
            }
          >
            별그대 video .m3u8 변환
          </button>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/my_love_from_the_star/language/ko`
              )
            }
          >
            별그대 한국어 .m3u8 변환
          </button>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/my_love_from_the_star/language/en`
              )
            }
          >
            별그대 영어 .m3u8 변환
          </button>
          <button
            onClick={() =>
              setApiUrl(
                `${process.env.REACT_APP_URL}/video/createStream/my_love_from_the_star/language/thai`
              )
            }
          >
            별그대 태국어 .m3u8 변환
          </button>
        </div>
      </div>
      <div>
        <h4>api 호출</h4>
        <button onClick={() => testApi()}>API 호출</button>
      </div>
      <ReactPlayer
        controls
        url="https://kr.object.ncloudstorage.com/jvoice-media-s3/media/my_love_from_the_star/streamingFile/video/my_love_from_the_star.m3u8"
      />
      {/* <ReactPlayer controls url={url} /> */}
      <ReactPlayer
        controls
        url="https://kr.object.ncloudstorage.com/jvoice-media-s3/media/my_love_from_the_star/streamingFile/ko/my_love_from_the_star_ko.m3u8"
      />
      <ReactPlayer
        controls
        url="https://kr.object.ncloudstorage.com/jvoice-media-s3/media/my_love_from_the_star/streamingFile/en/my_love_from_the_star_en.m3u8"
      />
      <ReactPlayer
        controls
        url="https://kr.object.ncloudstorage.com/jvoice-media-s3/media/my_love_from_the_star/streamingFile/thai/my_love_from_the_star_thai.m3u8"
      />

      <p>testApi is running...</p>
    </>
  );
};

export default Test;
