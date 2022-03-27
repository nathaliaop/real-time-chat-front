import { MessageContainer, Text, Timestamp, Username } from "./styles";

const Message = ({ username, text, createdAt }: { username: string, text: string, createdAt: string }) => {
  return (
    <MessageContainer>
      <Username>{username}</Username>
      <Text>{text}</Text>
      <Timestamp>{createdAt}</Timestamp>
    </MessageContainer>
  );
}

export default Message;