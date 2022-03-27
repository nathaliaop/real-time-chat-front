import styled from 'styled-components'
import config from '../../config.json';

export const InputStyle = styled.input`
    position: relative;
    font-size: 14px;
    width: 15%;
    margin: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    background: ${config.colors.mediumGreen};
    padding: 12px;
    border-radius: 3px;
    outline: none;
    color: ${config.colors.darkerGreen};
    transition: border-color 0.3 ease;
    :focus {
        border: 1px solid ${config.colors.darkerGreen};
    }
`;