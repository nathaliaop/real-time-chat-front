import { useState, useEffect, useRef } from "react";

import api from "../../services/api";

import { useToken } from "../../context/TokenContext";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

import { Container, Form, Menu, ChatContainer, OnlineUser } from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";

import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";

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
  const [text, setText] = useState<string>("");
  const { socket } = useSocket();
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const scrollbars = useRef<any>(<Scrollbars></Scrollbars>);

  const [connectedUsers, setConnectedUsers] = useState<any>([]);

  useEffect(() => {
    api
      .get("/messages", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const previousMessages: Message[] = response.data;
        setMessages(previousMessages);

        scrollbars.current.scrollToBottom();
      });
    socket.on("connectUser", (user: User) => {
      console.log(user);
      setConnectedUsers((state: User[]) => [...state, user]);
    });

    socket.on("disconnectUser", (user: User) => {
      console.log(user);
      setConnectedUsers((state: User[]) =>
        state.filter((connectedUser) => connectedUser.id !== user.id)
      );
    });

    socket.on("receivedMessage", (message: Message) => {
      console.log(message);
      receivedMessage(message);
    });

    socket.emit("firstConnection", (connectedUsers: any) => {
      setConnectedUsers(connectedUsers);
    });

    socket.on("messageDeleted", (messageId: number) => {
      setMessages((state) =>
        state.filter((message) => message.id !== messageId)
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

  const handleMessage = (e: any) => {
    e.preventDefault();
    if (validateInputMessage()) {
      const message: Payload = {
        text,
      };

      setText("");
      socket.emit("sentMessage", message);
    }
  };

  const handleLogout = () => {
    setToken("");
    socket.disconnect();
    navigate("/signin");
  };

  const handleDeleteMessage = (messageId: number) => {
    socket.emit("messageDelete", { messageId });
  };

  return (
    <Container>
      <Menu>
        <p>Online Users</p>
        <Scrollbars>
          {connectedUsers.map((user: any) => (
            <OnlineUser key={user.id}>{user.username}</OnlineUser>
          ))}
        </Scrollbars>
        <Button type="button" onClick={handleLogout}>
          Logout
        </Button>
      </Menu>
      <ChatContainer>
        <Scrollbars ref={scrollbars}>
          {messages.map((message: Message) => (
            <Message
              key={message.id}
              username={message.user.username}
              text={message.text}
              createdAt={moment(message.createdAt).format("HH:MM")}
              onDelete={() => handleDeleteMessage(message.id)}
            />
          ))}
        </Scrollbars>
        <Form onSubmit={handleMessage}>
          <Input
            width={"100%"}
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
