import styled from "styled-components";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpg";
import ayan from "../assets/images/ayan.png";

const stories = [
  { url: pic1, username: "jwalit21" },
  { url: pic2, username: "viratkohli" },
  { url: ayan, username: "_.ayan18" },
  { url: pic2, username: "shahid2002" },
  { url: ayan, username: "mahi7781" },
  { url: pic1, username: "rohit.sharma" },
  { url: pic3, username: "axarpatel" },
  { url: pic2, username: "parva210" },
  { url: pic1, username: "abdevilliars" },
  { url: ayan, username: "maxi" },
  { url: pic2, username: "utsav_shekh" },
  { url: pic3, username: "saloni2301" },
  { url: ayan, username: "mansi0802" },
  { url: pic1, username: "user1" },
  { url: ayan, username: "siraj" },
];

const StoryContainer = styled.div`
  margin-top: 10px;
  position: relative;
  scroll-behavior: smooth;
  background-color: #fff;
  overflow-x: scroll;
  display: flex;
  border: 1px solid #d9d9d9;
  padding: 15px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
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

const LeftBtnContainer = styled.div`
  position: absolute;
  left: 0;
`;

const RightBtnContainer = styled.div`
  position: absolute;
  right: 0;
`;

const LeftScrollBtn = styled.button`
  position: absolute;
  left: 0;
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #fff;
  box-shadow: 2px 2px 2px 2px #f2f2f2;
  border-radius: 50%;
  height: 27px;
  width: 27px;
  overflow: hidden;
  color: #000;
  color: rgba(0, 0, 0, 0.5);
`;

const RightScrollBtn = styled.button`
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #fff;
  box-shadow: 2px 2px 2px 2px #f2f2f2;
  border-radius: 50%;
  height: 27px;
  width: 27px;
  overflow: hidden;
  color: #000;
  color: rgba(0, 0, 0, 0.5);
`;

const Story = () => {
  const scrollBtnClick = (direction) => {
    if (direction == "left")
      document.getElementById("storyContainer").scrollLeft -= 80;
    else document.getElementById("storyContainer").scrollLeft += 80;
  };

  return (
    <StoryContainer id="storyContainer">
      <LeftBtnContainer>
        <LeftScrollBtn id="left" onClick={() => scrollBtnClick("left")}>
          &lt;
        </LeftScrollBtn>
      </LeftBtnContainer>
      {stories.map((story) => (
        <StoryBlock>
          <StoryImage src={story.url} />
          <br />
          <StoryUsername>{story.username}</StoryUsername>
        </StoryBlock>
      ))}
      <RightBtnContainer>
        <RightScrollBtn id="right" onClick={() => scrollBtnClick("right")}>
          &gt;
        </RightScrollBtn>
      </RightBtnContainer>
    </StoryContainer>
  );
};

export default Story;
