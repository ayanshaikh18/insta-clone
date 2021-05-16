import styled from "styled-components";
import pic1 from "../assets/images/pic1.jpeg";
import pic2 from "../assets/images/pic2.jpeg";
import pic3 from "../assets/images/pic3.jpg";
import ayan from "../assets/images/ayan.png";
import post3 from "../assets/images/post3.jfif";
import post10 from "../assets/images/post10.jfif";

const highlights = [
  { coverPic: pic1, title: "Virat" },
  { coverPic: post10, title: "Felicific2020" },
  { coverPic: post3, title: "Mrg Pics" },
  { coverPic: ayan, title: "My best pics" },
];

const HighlightsContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
`;

const Highlight = styled.div`
  padding-right: 40px;
  text-align:center;
  @media only screen and (max-width: 600px) {
    padding-right: 20px;
  }
`;

const CoverPhoto = styled.img`
  height: 75px;
  width: 70px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #d9d9d9;
  @media only screen and (max-width: 600px) {
    height: 50px;
    width: 45px;
  }
`;

const Highlights = () => {
  return (
    <HighlightsContainer>
      {highlights.map((highlight) => (
        <Highlight>
          <CoverPhoto src={highlight.coverPic} />
          <br />
          {highlight.title}
        </Highlight>
      ))}
    </HighlightsContainer>
  );
};

export default Highlights;
