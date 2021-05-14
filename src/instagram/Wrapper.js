import styled from 'styled-components';
import Navbar from '../components/navbar';
import Story from '../components/stories';

const Container = styled.div`
    background-color : #fafafa;
    min-height : 100%;
`;

const Main = styled.div`
    margin-top : 50px;
`;

const Wrapper = () => {
    return (
        <Container>
            <Navbar />
            <Main>
                <Story></Story>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
                <h1>abc</h1>
            </Main>
        </Container>
    )
}

export default Wrapper;