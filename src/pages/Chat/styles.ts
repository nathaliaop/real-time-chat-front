import styled from 'styled-components'
import config from '../../config.json';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  width: 100%;
  height: 100%;
  font-size: 12px;
  @media(max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 100vh;
  background-color: ${config.colors.darkGreen};
  @media(max-width: 600px) {
    display: none;
  }
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
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

export const OnlineUser = styled.span`
  text-align: center;
  font-size: 20px;
`;