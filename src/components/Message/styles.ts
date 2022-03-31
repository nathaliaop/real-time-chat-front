import styled from 'styled-components';
import config from '../../config.json';

type MessageContainerType = {
    userId: number;
    messageUserId: number;
}

export const MessageContainer = styled.div<MessageContainerType>`
    display: flex;
    flex-direction: column;
    align-self: ${props => props.userId === props.messageUserId ? 'flex-end' : 'flex-start'};
    padding: 20px;
    background-color: ${props => props.userId === props.messageUserId ? `${config.colors.darkGreen}` : `${config.colors.mediumGreen}`};
    border-radius: 40px;
    width: 40%;
    word-wrap: break-word;
`;

export const MessageContent = styled.div<MessageContainerType>`
    display: grid;
    grid-template-columns:  ${props => props.userId === props.messageUserId ? `90% 10%` : `100%`};
    grid-gap: 10px;
`

export const IconsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    svg {
        cursor: pointer;
    }
`

export const Form = styled.form`
    display: flex;
`

export const Sender = styled.span<MessageContainerType>`
    font-size: 15px;
    color: ${props => props.userId === props.messageUserId ? `${config.colors.mediumGreen}` : `${config.colors.darkGreen}`};
`;

export const Text = styled.p`
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
`;