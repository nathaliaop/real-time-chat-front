import { MessageContainer, Text, Sender } from "./styles";

const Message = ({ username, text, createdAt }: { username: string, text: string, createdAt: string }) => {
  return (
    <MessageContainer>
      <Sender>{username} {createdAt}</Sender>
      <Text>{text}</Text>
    </MessageContainer>
  );
}

export default Message;