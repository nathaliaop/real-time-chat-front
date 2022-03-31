import { useState, useEffect, useRef } from 'react';

import api from '../../services/api';

import { useToken } from '../../context/TokenContext';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';

import { Container, Form, Menu, ChatContainer, OnlineUser, MessagesContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Message from '../../components/Message';

import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';

type Message = {
  id: number;
  createdAt: Date;
  text: string;
  user: {
    id: number;
    username: string;
  };
};

type User = {
  id: number;
  username: string;
};

type Payload = {
  text: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const { socket } = useSocket();
  const { token, setToken, userId } = useToken();
  const navigate = useNavigate();
  const scrollbars = useRef<any>(<Scrollbars></Scrollbars>);

  const [connectedUsers, setConnectedUsers] = useState<any>([]);

  useEffect(() => {
    api
      .get('/messages', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        const previousMessages: Message[] = response.data;
        setMessages(previousMessages);

        scrollbars.current.scrollToBottom();
      })
      .catch((error) => {
        navigate('/signin');
      });

    socket.on('connectUser', (user: User) => {
      setConnectedUsers((state: User[]) => [...state, user]);
    });

    socket.on('disconnectUser', (user: User) => {
      setConnectedUsers((state: User[]) =>
        state.filter((connectedUser) => connectedUser.id !== user.id),
      );
    });

    socket.on('receivedMessage', (message: Message) => {
      receivedMessage(message);
    });

    socket.emit('firstConnection', (connectedUsers: any) => {
      setConnectedUsers(connectedUsers);
    });

    socket.on('messageDeleted', (messageId: number) => {
      setMessages((state) =>
        state.filter((message) => message.id !== messageId),
      );
    });

    socket.on('messageEdited', (messageId: number, text: string) => {
      setMessages((state) =>
        state.map((message) => {
          if (message.id === messageId) {
            return {
              ...message,
              text,
            };
          }
          return message;
        }),
      );
    });
  }, []);

  const receivedMessage = (message: Message) => {
    setMessages((state) => [...state, message]);
    scrollbars.current.scrollToBottom();
  };

  const validateInputMessage = () => {
    return text.length > 0;
  };

  const handleReceiveMessage = (e: any) => {
    e.preventDefault();
    if (validateInputMessage()) {
      const message: Payload = {
        text,
      };

      setText('');
      socket.emit('sentMessage', message);
    }
  };

  const handleLogout = () => {
    setToken('');
    socket.disconnect();
    navigate('/signin');
  };

  const handleDeleteMessage = (messageId: number) => {
    socket.emit('messageDelete', { messageId });
  };

  const handleEditMessage = (
    e: React.FormEvent<HTMLFormElement>,
    messageId: number,
    text: string,
  ) => {
    e.preventDefault();
    socket.emit('messageEdit', { messageId, text });
  };

  return (
    <Container>
      <Scrollbars>
        <Menu>
          <div>
            <p>Online Users</p>
            {connectedUsers.map((user: any) => (
              <OnlineUser key={user.id}>{user.username}</OnlineUser>
            ))}
          </div>
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </Menu>
      </Scrollbars>
      <ChatContainer>
        <Scrollbars ref={scrollbars}>
          <MessagesContainer>
            {messages.map((message: Message) => (
              <Message
                key={message.id}
                messageId={message.id}
                userId={userId}
                user={message.user}
                text={message.text}
                createdAt={moment(message.createdAt).format('HH:mm')}
                onDelete={handleDeleteMessage}
                onEdit={handleEditMessage}
              />
            ))}
          </MessagesContainer>
        </Scrollbars>
        <Form onSubmit={handleReceiveMessage}>
          <Input
            width={'100%'}
            value={text}
            onChange={setText}
            placeholder="Message"
          />
          <Button>Send</Button>
        </Form>
      </ChatContainer>
    </Container>
  );
};

export default Chat;
