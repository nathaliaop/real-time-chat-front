import styled from 'styled-components'
import config from '../../config.json';

export const ButtonLabel = styled.button`
    margin: 30px;
    background-color: ${config.colors.darkGreen};
    border: none;
    border-radius: 3px;
    font-size: 20px;
    color: ${config.colors.white};
    padding: 10px;
    width: 110px;
`;