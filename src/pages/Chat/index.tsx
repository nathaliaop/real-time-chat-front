import { useState, useEffect, useContext } from 'react';
import {
    Container,
    Content,
    Form
} from './styles'
import api from '../../services/api';
import Input from '../../components/Input';

import ChatMessage from '../../components/ChatMessage';
import { useToken } from '../../context/TokenContext';
import { useSocket } from '../../context/SocketContext';

type Message = {
    id: number,
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

      socket.on('msgToClient', (message: Message) => {
        console.log(message);
        receivedMessage(message);
      })
    }, [])

    const receivedMessage = (message: Message) => {
      setMessages(state => [ ...state, message ]);
    }
  
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
        <Container>
          <Content>
            {messages.map((message: Message) => (
              <ChatMessage
              key={message.id}
              username={message.user.username}
              text={message.text}
              createdAt={message.createdAt}
              />
            ))}
            <Form>
              <Input value={ text } onChange={ setText } placeholder='Message'/>
              <button onClick={ sendMessage }>Send</button>
            </Form>
            </Content>
        </Container>
    );
}

export default Chat;