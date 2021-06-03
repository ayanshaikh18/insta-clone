import styled from "styled-components";
import loader from "../assets/images/loading.gif";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.img`
  height: 70px;
  width: 70px;
  padding: 10px;
`;

const Loading = () => {
  return (
    <Container>
      <Loader src={loader} />
    </Container>
  );
};

export default Loading;
