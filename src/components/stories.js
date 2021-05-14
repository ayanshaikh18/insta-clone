import styled from 'styled-components';
import pic1 from '../assets/images/pic1.jpeg';

const StoryContainer = styled.div`
    margin-top : 65px;
    background-color : #fff;
    overflow-x : scroll;
    display : flex;
`;

const StoryBlock = styled.div`
    margin-right : 25px;
`;

const StoryImage = styled.img`
    height : 50px;
    width : 50px;
    border-radius : 50%;
`;

const Story = () => {
    return (
        <StoryContainer>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
            <StoryBlock>
                <StoryImage src={pic1} />
            </StoryBlock>
        </StoryContainer>
    )
}

export default Story;