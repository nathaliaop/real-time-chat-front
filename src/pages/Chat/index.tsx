import { useState, useEffect } from 'react';
import {
    Container,
    Content,
    Form
} from './styles'
import api from '../../services/api';
import Input from '../../components/Input';

import Message from '../../components/Message';
import { useToken } from '../../context/TokenContext';
import { useSocket } from '../../context/SocketContext';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

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
    const { token, setToken } = useToken();
    const navigate = useNavigate();

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
    
    const handleMessage = () => {
      if (validateInputMessage()) {
        const message: Payload = {
          text,
        }
  
        socket.emit('msgToServer', message);
        setText('');
      }
    }

    const handleLogout = () => {
      setToken('');
      navigate('/signin')
    }

    return (
        <Container>
          <Content>
            {messages.map((message: Message) => (
              <Message
              key={message.id}
              username={message.user.username}
              text={message.text}
              createdAt={message.createdAt}
              />
            ))}
            <Form onSubmit={ handleMessage }>
              <Input value={ text } onChange={ setText } placeholder='Message'/>
              <Button>Send</Button>
            </Form>
            <Button type='button' onClick={ handleLogout }>Logout</Button>
            </Content>
        </Container>
    );
}

export default Chat;