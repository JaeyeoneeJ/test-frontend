import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  min-width: 100px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const DropdownItem = styled.li`
  min-width: 100px;
  padding: 8px 12px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const DropdownButton = ({
  options,
  defaultLanguage,
  setVoiceUrl,
  videoInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultLanguage);
  const changeOption =
    selectedOption === "ko"
      ? "한국어"
      : selectedOption === "en"
      ? "English"
      : selectedOption === "thai"
      ? "ไทย"
      : "알 수 없는 언어팩";
  console.log("selectedOption: ", selectedOption);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (option === "ko") {
      setVoiceUrl(
        `${process.env.REACT_APP_URL_S3}/${videoInfo.title}/streamingFile/ko/${videoInfo.title}_ko.m3u8`
      );
    } else if (option === "en") {
      setVoiceUrl(
        `${process.env.REACT_APP_URL_S3}/${videoInfo.title}/streamingFile/en/${videoInfo.title}_en.m3u8`
      );
    } else if (option === "thai") {
      setVoiceUrl(
        `${process.env.REACT_APP_URL_S3}/${videoInfo.title}/streamingFile/thai/${videoInfo.title}_thai.m3u8`
      );
    } else {
      alert("올바르지 않은 언어 팩이 감지되었습니다.");
    }
  };

  //   process.env.REACT_APP_URL_S3;
  return (
    <Wrapper>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {changeOption ||
          (defaultLanguage === "ko"
            ? "한국어"
            : defaultLanguage === "en"
            ? "English"
            : defaultLanguage === "thai"
            ? "ไทย"
            : "알 수 없는 언어팩")}
      </Button>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem key={option} onClick={() => handleSelect(option)}>
              {option === "ko"
                ? "한국어"
                : option === "en"
                ? "English"
                : option === "thai"
                ? "ไทย"
                : "알 수 없는 언어팩"}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Wrapper>
  );
};

export default DropdownButton;
