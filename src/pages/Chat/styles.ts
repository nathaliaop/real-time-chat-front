import styled from 'styled-components'
import config from '../../config.json';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  font-size: 12px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 25%;
  background-color: ${config.colors.darkGreen};
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

export const Form = styled.form`
  display: flex;
  font-size: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 100%;
`;

export const OnlineUser = styled.p`
  text-align: center;
  font-size: 20px;
`;