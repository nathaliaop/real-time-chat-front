import styled from 'styled-components'
import config from '../../config.json';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    font-size: 12px;
    span {
        a {  
            cursor: pointer;
            color: ${config.colors.darkGreen};
        }
    }
`;

export const Form = styled.form`
    display: flex;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

export const Title = styled.h1`
    font-size: 50px;
    color: ${config.colors.darkGreen};
`;

export const Span = styled.span`
    color: grey;
    font-size: 16px;
`;