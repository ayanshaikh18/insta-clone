import styled from "styled-components";

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.div`
  background-color: #fff;
  margin: 35px;
  margin-bottom: 0px;
  padding: 20px;
  width: 300px;
  border: 1px solid #d9d9d9;
`;

const Container = (props) => {
  return (
    <ContainerDiv>
      <Card>{props.children}</Card>
    </ContainerDiv>
  );
};

export default Container;
