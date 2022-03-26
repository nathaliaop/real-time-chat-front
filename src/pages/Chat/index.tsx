import { useState, useEffect, useContext } from 'react';
import {
    Container,
    Content,
    Form
} from './styles'
import api from '../../services/api';
import Input from '../../components/Input';

import io from 'socket.io-client';
import ChatMessage from '../../components/ChatMessage';
import { TokenContext, useToken } from '../../context/TokenContext';
import { useSocket } from '../../context/SocketContext';

type Message = {
    createdAt: string,
    text: string,
    user: {
        username: string
    }
  }

type Payload = {
    text: string
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState<string>('');
    const [loaded, setLoadead] = useState<boolean>(true);
    const { socket } = useSocket();
    const { token } = useToken();

    useEffect(() => {
        api.get('/messages',
          {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        ) 
          .then((response) => {
            const previousMessages: Message[] = response.data
            setMessages(previousMessages)
          })
      }, [])
    
      useEffect(() => {
        const receivedMessage = (message: Message) => {
          const newMessage: Message = {
            createdAt: message.createdAt,
            text: message.text,
            user: {
                username: message.user.username
            }
          }
          
          setMessages(() => [ ...messages, newMessage ]);
        }
        
        // Toda vez que alguem manda uma mensagem, atualiza o array de mensagens
        socket.on('msgToClient', (message: Message) => {
          console.log(message);
          receivedMessage(message);
        })
      }, [messages]);
    
      const validateInputMessage = () => {
        return text.length > 0;
      }
      
      const sendMessage = () => {
        if (validateInputMessage()) {
          const message: Payload = {
            text,
          }
    
          socket.emit('msgToServer', message);
          setText('');
        }
      }

    return (
      loaded ? 
        <Container>
          <Content>
            <Form>
              {messages.map((message: Message, index: number) => (
                <ChatMessage
                key={index}
                username={message.user.username}
                text={message.text}
                createdAt={message.createdAt}
                />
              ))}
                  <Input value={ text } onChange={ setText } placeholder='Message'/>
                  <button onClick={sendMessage}>Send</button>
              </Form>
            </Content>
        </Container>
        :
        <h1>Loading</h1>
    );
}

export default Chat;