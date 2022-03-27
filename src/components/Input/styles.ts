import styled from 'styled-components'
import config from '../../config.json';

export const InputLabel = styled.label`
    position: relative;
    font-size: 14px;
    padding-top: 20px;
    input{
        border: 1.5px solid ${config.colors.darkGreen};
        -webkit-appearance: none;
        appearance: none;
        background: ${config.colors.mediumGreen};
        padding: 12px;
        border-radius: 3px;
        width: 250px;
        outline: none;
        font-size: 14px;
        color: ${config.colors.darkerGreen};
        transition: border-color 0.3 ease; 
    }
    span{
        position: absolute;
        left: 12px;
        top: calc(50% + 10px);
        transform: translateY(-50%);
        color: ${config.colors.darkGreen};
        transition: 
            top 0.3s ease,
            font-size 0.3s ease,
            color 0.3s ease;
    }
    & input:valid + span,
    & input:focus + span{
        top: 33%;
        font-size: 10px;
        color: ${config.colors.darkGreen};
        background: ${config.colors.mediumGreen};
    }
    & input:valid + span,
    & input:focus + span{
        padding: 0 5px;
        left: 8px;
    }
    & input:valid, 
    & input:focus{
        border-color: ${config.colors.darkGreen};
        transition-delay: 0.1s;
    }
`;