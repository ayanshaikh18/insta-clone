import styled from "styled-components";
import { useEffect } from "react";
import $ from "jquery";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  opacity: 0;
  display: none;
  :target {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }
  &::-webkit-transition {
    opacity: 100ms ease-in;
  }
  &::-moz-transition {
    opacity: 100ms ease-in;
  }
  transition: opacity 100ms ease-in;
`;

const ModalContent = styled.div`
  width: 100%;
  width: ${(props)=>props.width ? props.width : "600px"};
  position: relative;
  margin: 5% auto;
  border-radius: 15px;
  background: #fff;
  z-index: 99999;
  @media only screen and (max-width: 600px) {
    max-width: 350px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  border-radius: 50%;
  padding: 10px;
  background-color: #bfbfbf;
  color: #fff;
  border: 2px solid #f2f2f2;
  font-size: 17px;
  width: 40px;
  cursor: pointer;
`;

const ModalArea = styled.div`
  overflow-x: auto;
  max-height: 600px;
`
const Modal = (props) => {
  const openModal = () => {
    $("#" + props.modalId).css({
      display: "block",
      opacity: 1,
      "pointer-events": "auto",
    });
  };

  const closeModal = () => {
    var callback = props.callback;
    if (callback) callback();
    $("#" + props.modalId).css({
      display: "none",
      opacity: 0,
    });
  };

  useEffect(() => {
    let id = props.modalId;
    console.log($("[open-modal=" + id + "]").on("click", () => openModal()));
  }, []);

  return (
    <ModalContainer id={props.modalId}>
      <ModalContent width={props.width}>
        <ModalArea>
        {props.children}
        </ModalArea>
        <CloseBtn onClick={() => closeModal()}>
          <i className="fa fa-times"></i>
        </CloseBtn>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
