import styled from 'styled-components'
import config from '../../config.json';

export const ButtonStyle = styled.button`
    margin: 30px;
    background-color: ${config.colors.darkGreen};
    border: none;
    border-radius: 3px;
    font-size: 20px;
    color: ${config.colors.white};
    padding-top: 10px;
    padding-bottom: 10px;
    width: 5rem;
    cursor: pointer;
    :hover {
        background-color: ${config.colors.darkerGreen};
    }
`;