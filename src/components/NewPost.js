import styled from "styled-components";
import Modal from "./Modal";
import {
  Logo,
  InputContainer,
  Input,
  SubmitBtn,
  ErrorMsg,
} from "../instagram/Signup";
import { useState } from "react";
import uploadFile from "../firebase/uploadFile";

const Header = styled.div`
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

const Body = styled.div`
  padding: 10px;
  /* width: 100%; */
  display: flex;
  justify-content: center;
`;

const CaptionTextArea = styled.textarea`
  background-color: #fafafa;
  width: 100%;
  padding: 5px;
  /* padding-left: 10px; */
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 12px;
  :focus {
    border: 1px solid red;
  }
`;

const NewPost = (props) => {
  const [imageFile, setImageFile] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    console.log(imageFile);
    uploadFile(imageFile,(url)=>{
        console.log(url);
    })
  };

  return (
    <Modal modalId={props.ModalId}>
      <Header>
        <h3>New Post</h3>
      </Header>
      <Body>
        <form onSubmit={submitForm}>
          <InputContainer style={{ width: "400px" }}>
            <Input
              type="file"
              placeholder="Select Image"
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
              required
            />
          </InputContainer>
          <InputContainer style={{ width: "400px" }}>
            <CaptionTextArea
              type="text"
              placeholder="Enter Caption"
              rows="10"
            ></CaptionTextArea>
          </InputContainer>
          <InputContainer style={{ width: "400px" }}>
            <SubmitBtn type="submit">Post</SubmitBtn>
          </InputContainer>
        </form>
      </Body>
      <br />
      <br />
    </Modal>
  );
};

export default NewPost;
