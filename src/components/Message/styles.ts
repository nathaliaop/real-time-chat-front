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
    margin: 30px;
    background-color: ${props => props.userId === props.messageUserId ? `${config.colors.darkGreen}` : `${config.colors.mediumGreen}`};
    border-radius: 40px;
    width: 40%;
`;

export const Sender = styled.span<MessageContainerType>`
    font-size: 15px;
    color: ${props => props.userId === props.messageUserId ? `${config.colors.mediumGreen}` : `${config.colors.darkGreen}`};
`;

export const Text = styled.span`
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
    width: 100%;
    overflow-wrap: break-word
`;