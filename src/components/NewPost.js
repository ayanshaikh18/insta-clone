import styled from "styled-components";
import Modal from "./Modal";
import {
  InputContainer,
  Input,
  SubmitBtn,
  ErrorMsg,
} from "../instagram/Signup";
import { useState } from "react";
import uploadFile from "../firebase/uploadFile";
import { useForm } from "react-hook-form";
import { postPost } from "../services/postService";
import { useHistory } from "react-router-dom";
import postSuccess from "../assets/images/postSuccess.jpg"

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
  padding: 7px;
  /* padding-left: 10px; */
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 15px;
  :focus {
    border: 1px solid red;
  }
`;

const NewPost = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posted, setPosted] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  const submitForm = (data) => {
    setIsSubmitting(true);
    uploadFile(data.imageFile[0], async (url) => {
      console.log(url);
      data.postedImage = url;
      let response = await postPost(data);
      console.log(response.status);
      setPosted(true);
      // history.push("/");
      setIsSubmitting(false);
    });
  };

  const validateImageFile = (file) => {
    let fileType = file[0].type;
    return fileType.includes("image") ? true : "Please Select Image File";
  };

  return (
    <Modal modalId={props.ModalId}>
      {!posted ? (
        <>
          <Header>
            <h3>New Post</h3>
          </Header>
          <Body>
            <form onSubmit={handleSubmit(submitForm)}>
              <InputContainer style={{ width: "400px" }}>
                <Input
                  type="file"
                  placeholder="Select Image"
                  accept="image/*"
                  {...register("imageFile", {
                    required: "Please Select File.",
                    validate: validateImageFile,
                  })}
                />
                {errors.imageFile && (
                  <ErrorMsg>{errors.imageFile.message}</ErrorMsg>
                )}
              </InputContainer>
              <InputContainer style={{ width: "400px" }}>
                <CaptionTextArea
                  type="text"
                  placeholder="Enter Caption"
                  rows="10"
                  {...register("caption")}
                ></CaptionTextArea>
              </InputContainer>
              <InputContainer style={{ width: "400px" }}>
                <SubmitBtn type="submit" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i
                        className="fa fa-spinner fa-spin"
                        aria-hidden="true"
                      ></i>
                    </>
                  ) : (
                    <>Post</>
                  )}
                </SubmitBtn>
              </InputContainer>
            </form>
          </Body>
        </>
      ) : (
        <>
          <br /><br />
          <InputContainer>
            <img
              src={postSuccess}
              height="150"
              width="150"
            /> <br />
            <h3 style={{color:"green"}}>Posted Successfully</h3>
          </InputContainer>
        </>
      )}
      <br />
      <br />
    </Modal>
  );
};

export default NewPost;
