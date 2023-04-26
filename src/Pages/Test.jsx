import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const Test = () => {
  // const title = "my_love_from_the_star";
  const title = "extraordinary_attorney_woo";
  const videoRef = useRef(null);
  const [url, setUrl] = useState();
  console.log(videoRef.current?.src);
  console.log("url: ", url);

  const testApi = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/audio/separate/${title}/en`
      );
      console.log("data: ", data);
      setUrl(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  return (
    <>
      <button onClick={() => testApi()}>test API</button>
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
