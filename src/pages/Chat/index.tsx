import {
  useState,
  useEffect,
  useRef
} from 'react';

import api from '../../services/api';

import { useToken } from '../../context/TokenContext';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Form,
    Menu,
    ChatContainer
} from './styles'

import Input from '../../components/Input';
import Button from '../../components/Button';
import Message from '../../components/Message';

import { Scrollbars } from 'react-custom-scrollbars';
import { format } from 'date-fns'


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
    const scrollbars = useRef<any>(<Scrollbars></Scrollbars>);

    useEffect(() => {
      
      api.get('/messages',
      {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        ) 
        .then((response) => {
          const previousMessages: Message[] = response.data;
          setMessages(previousMessages);
          scrollbars.current.scrollToBottom();
        })
        
        socket.on('msgToClient', (message: Message) => {
          console.log(message);
          receivedMessage(message);
        })
    }, [])

    const receivedMessage = (message: Message) => {
      setMessages(state => [ ...state, message ]);
      scrollbars.current.scrollToBottom();
    }
  
    const validateInputMessage = () => {
      return text.length > 0;
    }
    
    const handleMessage = (e: any) => {
      e.preventDefault();
      if (validateInputMessage()) {
        const message: Payload = {
          text,
        }
        
        setText('');
        socket.emit('msgToServer', message)
      }
    }

    const handleLogout = () => {
      setToken('');
      navigate('/signin')
    }
    
    
    return (
        <Container>
            <Menu>
              <Button type='button' onClick={ handleLogout } >Logout</Button>
            </Menu>
            <ChatContainer>
                <Scrollbars style={{ height: 2000 }} ref={ scrollbars }>
                  {messages.map((message: Message) => (
                    <Message
                    key={message.id}
                    username={message.user.username}
                    text={message.text}
                    createdAt={message.createdAt}
                    />
                    ))}
                </Scrollbars>
                <Form onSubmit={ handleMessage }>
                  <Input width={ "100%" } value={ text } onChange={ setText } placeholder='Message'/>
                  <Button>Send</Button>
                </Form>
            </ChatContainer>
        </Container>
    );
}

export default Chat;