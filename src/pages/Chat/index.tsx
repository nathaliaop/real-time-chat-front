import { useState, useEffect } from 'react';
import {
    Container,
    Form
} from './styles'
import api from '../../services/api';
import Input from '../../components/Input';

import io from 'socket.io-client';
import ChatMessage from '../../components/ChatMessage';

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

const socketOptions = {
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: 'Bearer ' + (sessionStorage.getItem('token') || '')
            }
        }
    }
};

const socket = io('http://localhost:5050', socketOptions);

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        api.get('/messages')
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
        <>
        <Container>
            <Form>
                <Input value={ text } onChange={ setText } placeholder='Message'/>
                <button onClick={sendMessage}>Send</button>
                {messages.map((message: Message, index: number) => (
                <ChatMessage
                key={index}
                username={message.user.username}
                text={message.text}
                createdAt={message.createdAt}
                />
            ))}
            </Form>
        </Container>
        </>
    );
}

export default Chat;