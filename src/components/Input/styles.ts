import styled from 'styled-components'

export const InputLabel = styled.label`
    *,*::before, *::after{
        box-sizing: border-box;
    }
    font-family: 'Montserrat', sans-serif;
    position: relative;
    font-size: 14px;
    padding-top: 20px;
    margin-bottom: 5px;
    input{
        border: 2px solid #2596be;
        -webkit-appearance: none;
        appearance: none;
        background: none;
        padding: 12px;
        border-radius: 3px;
        width: 250px;
        outline: none;
        font-size: 14px;
        transition: border-color 0.3 ease; 
    }
    span{
        position: absolute;
        left: 12px;
        top: calc(50% + 10px);
        transform: translateY(-50%);
        color: #2596be;
        transition: 
            top 0.3s ease,
            font-size 0.3s ease,
            color 0.3s ease;
    }
    & input:valid + span,
    & input:focus + span{
        top: 33%;
        font-size: 10px;
        color: #2596be;
        background: #FBE9F6;
    }
    & input:valid + span,
    & input:focus + span{
        padding: 0 5px;
        left: 8px;
    }
    & input:valid, 
    & input:focus{
        border-color: #2596be;
        transition-delay: 0.1s;
    }
`;