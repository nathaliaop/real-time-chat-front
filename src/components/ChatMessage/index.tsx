import { Container } from './styles';

const ChatMessage = ({ username, text, createdAt }: { username: string, text: string, createdAt: string }) => {
  return (
    <div>
      <p>{username}</p>
      <p>{text}</p>
      <p>{createdAt}</p>
    </div>
  );
}

export default ChatMessage;