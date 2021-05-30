import styled from "styled-components";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpg";
import ayan from "../assets/images/ayan.png";

import mahi from "../assets/images/MAhi.jfif";
import rohit from "../assets/images/Rohit.jfif";
import axar from "../assets/images/Axar.jfif";
import utsav from "../assets/images/Utsav.jfif";
import jwalit from "../assets/images/Jwalit.jfif";
import saloni from "../assets/images/Saloni.jfif";
import shahid from "../assets/images/Shahid.jfif";
import mansi from "../assets/images/Mansi.jfif";

const stories = [ 
  { url: jwalit, username: "jwalit21" },
  { url: pic2, username: "viratkohli" },
  { url: ayan, username: "_.ayan18" },
  { url: shahid, username: "shahid2002" },
  { url: mahi, username: "mahi7781" },
  { url: rohit, username: "rohit.sharma" },
  { url: axar, username: "axarpatel" },
  { url: pic2, username: "parva210" },
  { url: pic1, username: "abdevilliars" },
  { url: ayan, username: "maxi" },
  { url: utsav, username: "utsav_shekh" },
  { url: saloni, username: "saloni2301" },
  { url: mansi, username: "mansi0802" },
  { url: pic1, username: "user1" },
  { url: ayan, username: "siraj" },
];

const ScrollBtn = styled.button`
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #fff;
  box-shadow: 2px 2px 2px 2px #f2f2f2;
  border-radius: 50%;
  height: 27px;
  width: 27px;
  position: fixed;
  overflow: hidden;
  color: #000;
  color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: none;
`;

const StoryContainer = styled.div`
  margin-top: 10px;
  position: relative;
  scroll-behavior: smooth;
  background-color: #fff;
  overflow-x: scroll;
  display: flex;
  border: 1px solid #d9d9d9;
  padding: 15px;
  &::-webkit-scrollbar {
    display: none;
  }
  &:hover ${ScrollBtn} {
    display: block;
  }
`;

const StoryBlock = styled.div`
  margin-right: 25px;
  position: relative;
`;

const StoryImage = styled.img`
  height: 50px;
  width: 50px;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid #ff4d4d;
`;

const StoryUsername = styled.div`
  font-size: 13px;
  overflow: hidden;
  text-align: center;
`;

const Story = () => {
  const scrollBtnClick = (direction) => {
    if (direction == "left")
      document.getElementById("storyContainer").scrollLeft -= 80;
    else document.getElementById("storyContainer").scrollLeft += 80;
  };

  return (
    <StoryContainer id="storyContainer">
      <StoryBlock>
        <ScrollBtn id="left" onClick={() => scrollBtnClick("left")}>
          &lt;
        </ScrollBtn>
      </StoryBlock>
      {stories.map((story) => (
        <StoryBlock>
          <StoryImage src={story.url} />
          <br />
          <StoryUsername>{story.username}</StoryUsername>
        </StoryBlock>
      ))}
      <StoryBlock>
        <ScrollBtn
          id="right"
          style={{ right: "40%" }}
          onClick={() => scrollBtnClick("right")}
        >
          &gt;
        </ScrollBtn>
      </StoryBlock>
    </StoryContainer>
  );
};

export default Story;
