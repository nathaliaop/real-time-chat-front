import styled from 'styled-components';
import config from '../../config.json';

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 30px;
    background-color: ${config.colors.darkGreen};
    border-radius: 40px;
    width: 40%;
`;

export const Username = styled.span`
    font-size: 15px;
    color: ${config.colors.mediumGreen};
    `;

export const Text = styled.span`
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 20px;
    width: 100%;
    overflow-wrap: break-word
`;

export const Timestamp = styled.span`
    font-size: 10px;
    color: ${config.colors.mediumGreen};
`;